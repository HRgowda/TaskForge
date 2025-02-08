// Worker processor to process the Actions

import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./send_sol";
import { sendInr } from "./send_inr";

const TOPIC_NAME = "zap-events";
const prismaClient = new PrismaClient();

const kafka = new Kafka({
  clientId: "worker_processor",
  brokers: ["localhost:9092"],
});

// function to fetch the latest zapRuns of the logged user.
async function fetchLatestZapRun(userId: number) {
  if (!userId) return null;

  const latestZapRun = await prismaClient.zapRun.findFirst({
    where: {
      zap: {
        userId: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      metadata: true,
      createdAt: true,
      zapId: true,
    },
  });

  return latestZapRun?.metadata || null;
}

async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker",
  });
  await consumer.connect();

  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true,
  });

  // suppose we pulled the message from the kakfka and the server dies and now we did not actually process it , this creates an issue that the message has not been processed but pulled out of kafka, so this needs an mannual acknowledgement that is when ever ther kafka pulls the message it doesnt mean that it is done we will say when it is done and then move to the next process, hence we set autoCommit to false 
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {

      // parse the value that is being logged
      if (!message.value?.toString()) {
        // if a null value is pushed then return.
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;
      const userId = parsedValue.userId;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: { // zap table has the relation with other tabes like actions and trigger so include actions, if only zap is set to true then it returns the data in its table but not the data associated with it.
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
              user: true,
            },
          },
        },
      });

      if (!zapRunDetails) {
        console.error(`No ZapRun found for ID: ${zapRunId}`);
        return;
      }
      
      // now we have to execute the tasks based on the sorting order and feed it to the stage.
      const currentAction = zapRunDetails.zap.actions.find(
        (x) => x.sortingOrder === stage
      );

      if (!currentAction) {
        console.error("Current action not found");
        return;
      }

      const zapRunMetadata = await fetchLatestZapRun(userId);

      if (currentAction.type.name === "Email") {
        // todos check the logged user email and then send .
        try {
          console.log("Sending email");
          const body = parse(
            (currentAction.metadata as JsonObject)?.body as string,
            zapRunMetadata
          );
          const to = parse(
            (currentAction.metadata as JsonObject)?.email as string,
            zapRunMetadata
          );

          if (!to) {
            console.error("Invalid email address.");
            return;
          }

          await sendEmail(to, body);

          console.log(`Email sent to ${to}, body: ${body}`);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }

      if (currentAction.type.name === "Solana") {
        try {
          console.log("Processing Solana transaction...");
          const amountRaw = (currentAction.metadata as JsonObject)?.amount as string;
          const addressRaw = (currentAction.metadata as JsonObject)?.address as string;

          // Check if the required fields are present and valid
          if (!amountRaw || !addressRaw) {
            console.error("Missing amount or address in metadata.");
            return;
          }

          // Parse the values (make sure they're in the correct format)
          const amount = parse(amountRaw, zapRunMetadata);
          const recipientEmail = parse(addressRaw, zapRunMetadata);

          // Ensure sender email is a string (use type guard)
          const senderEmail = zapRunDetails.zap.user.email;

          if (!String(senderEmail)) {
            console.error("Invalid sender email.");
            return;
          }

          // Ensure parsed values are valid
          if (!amount || !recipientEmail || !senderEmail) {
            console.error("Invalid Solana transaction details.");
            return;
          }

          await sendSol(senderEmail, amount, recipientEmail);
          console.log(`Sent SOL ${amount} to ${recipientEmail}`);
        } catch (error) {
          console.error("Error processing Solana transaction:", error);
        }
      }

      if (currentAction.type.name === "INR") {
        try {
          
          const amountRaw = (currentAction.metadata as JsonObject)?.rupees as string;
          const addressRaw = (currentAction.metadata as JsonObject)?.address as string;

          if (!amountRaw || !addressRaw) {
            console.error("Missing INR amount or address in metadata.");
            return;
          }

          const amount = parse(amountRaw, zapRunMetadata);
          const recipientEmail = parse(addressRaw, zapRunMetadata);
          const senderEmail = zapRunDetails.zap.user.email;

          if (!amount || !recipientEmail || !senderEmail) {
            console.error("Invalid INR transaction details.");
            return;
          }

          await sendInr(senderEmail, amount, recipientEmail);
          console.log(`Sent INR ${amount} to ${recipientEmail}`);
        } catch (error) {
          console.error("Error processing INR transaction:", error);
        }
      }

      await new Promise((r) => setTimeout(r, 500));

      // now push the control back to queue to see is there any action to be performed, it can also be done parallelly or sequentially.

      const lastStage = (zapRunDetails?.zap.actions?.length || 1) - 1;

      // now a producer will send a new value.

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                userId,
                stage: stage + 1, // a new stage value so that the worker picks up and process the action based on the stage.
                zapRunId,
              }),
            },
          ],
        });
      }

      console.log("Processing Done");

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
