// Worker processor to process the actions

import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parser";
import { sendEmail } from "./email";

const TOPIC_NAME = "zap-events"
const prismaClient = new PrismaClient();

const kafka = new Kafka({
  clientId: 'worker_processor',
  brokers: ['localhost:9092']
})

async function main() {

  const consumer = kafka.consumer({
    groupId: "main-worker"
  })
  await consumer.connect();
  
  const producer = kafka.producer();
  await producer.connect();

  await consumer.subscribe({
    topic: TOPIC_NAME,
    fromBeginning: true
  })

// suppose we pulled the message from the kakfka and the server dies and now we did not actually process it , this creates an issue that the message has not been processed but pulled out of kafka, so this needs an mannual acknowledgement that is when ever ther kafka pulls the message it doesnt mean that it is done we will say when it is done and then move to the next process, hence we set autoCommit to false 
  await consumer.run({
    autoCommit: false,
    eachMessage: async ( {
      topic, partition, message
    }) => {

      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString()
      })

      // parse the value that is being logged

      if (!message.value?.toString()){ // if a null value is pushed then return.
        return ;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await prismaClient.zapRun.findFirst({
        where:{
          id: zapRunId
        }, 
        include: {
          zap:{ // zap table has the relation with other tabes like actions and trigger so include actions, if only zap is set to true then it returns the data in its table but not the data associated with it.
            include: {
              actions: {
                include: {
                  type: true
                }
              }
            }
          }
        }
      })

      // now we have to execute the tasks based on the sorting order and feed it to the stage.
      const currentAction = zapRunDetails?.zap.actions.find(x => x.sortingOrder === stage);
      
      if(!currentAction) {
        console.log("Current action not found");
        return;
      }

      // console.log(currentAction);

      const zapRunMetadata = zapRunDetails?.metadata;

      if (currentAction.type.name === "Email") {

        const body = parse((currentAction.metadata as JsonObject)?.body as string, zapRunMetadata);
        const to = parse((currentAction.metadata as JsonObject)?.email as string, zapRunMetadata);

        await sendEmail(to, body);

        console.log(`Sending email to ${to} body is ${body}`)
      } 

      if (currentAction.type.name === "Send_Solana") {

        const amount = parse((currentAction.metadata as JsonObject).amount as string, zapRunMetadata);
        const address = parse((currentAction.metadata as JsonObject).address as string, zapRunMetadata)
        console.log(`Sending SOL ${amount} to ${address}`);

      } 

      await new Promise(r => setTimeout(r, 500));

      // now push the control back to queue to see is there any action to be performed, it can also be done parallelly or sequentially.
      const lastStage = (zapRunDetails?.zap.actions?.length || 1 ) - 1
      
      // now a producer will send a new value.
      if (lastStage !== stage) {
        producer.send({
          topic: TOPIC_NAME,
          messages: [{
            value: JSON.stringify({
              stage: stage + 1, // a new stage value so that the worker picks up and process the action based on the stage.
              zapRunId
            }),
            
          }]
        })
      }

      console.log("Processing Done")

      await consumer.commitOffsets([{
        topic: TOPIC_NAME,
        partition: partition,
        offset: (parseInt(message.offset) + 1).toString()
      }])
    }
  }) 
}

main();
