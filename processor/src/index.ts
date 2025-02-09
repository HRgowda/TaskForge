import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();

  try {
    await producer.connect();
    console.log("Kafka producer connected");

    while (true) {
      try {
        const pendingRows = await client.zapRunOutbox.findMany({
          where: {},
          take: 10,
          include: {
            zapRun: {
              include: {
                zap: {
                  select: {
                    userId: true,
                    user: true
                  },
                },
              },
            },
          },
        });

        if (pendingRows.length === 0) {
          console.log("No pending messages, waiting...");
          await new Promise((r) => setTimeout(r, 3000));
          continue;
        }        

        console.log(`Processing ${pendingRows.length} messages...`);

        await producer.send({
          topic: TOPIC_NAME,
          messages: pendingRows.map((r) => ({
            value: JSON.stringify({
              value: r.zapRunId,
              userId: r.zapRun.zap.userId,
              stage: 0, // stage defines which action the "worker" is currently executing
            }),
          })),
        });

        await client.zapRunOutbox.deleteMany({
          where: {
            id: {
              in: pendingRows.map((x) => x.id),
            },
          },
        });

        console.log(`Successfully processed and removed ${pendingRows.length} messages`);
      } catch (error) {
        console.error("Error processing messages:", error);
      }

      await new Promise((r) => setTimeout(r, 3000)); // Delay before the next loop iteration
    }
  } catch (error) {
    console.error("Fatal error:", error);
  }
  // } finally {
  //   console.log("Closing Kafka producer...");
  //   await producer.disconnect();
  //   console.log("Kafka producer disconnected");
  // }
}

// Graceful shutdown handler
// process.on("SIGINT", async () => {
//   console.log("SIGINT received. Shutting down...");
//   await client.$disconnect();
//   process.exit(0);
// });

// process.on("SIGTERM", async () => {
//   console.log("SIGTERM received. Shutting down...");
//   await client.$disconnect();
//   process.exit(0);
// });

// Start the processor
main();
