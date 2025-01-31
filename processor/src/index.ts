// proccessor that pull's the outbox from the database and push it to the kafka queue
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
  clientId: 'outbox-processor',
  brokers: ['localhost:9092']
})

async function main() {
  const producer = kafka.producer();

  await producer.connect();

  while (1) {
    const pendingRows = await client.zapRunOutbox.findMany({
      where:{},
      take: 10
    })

    console.log(pendingRows)

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map(r => ({
        value: JSON.stringify({
          value: r.zapRunId,
          stage: 0 // stage defines which action is the "worker" currently executing 
        })
      }))
    });

    await client.zapRunOutbox.deleteMany({
      where:{
        id : {
          in: pendingRows.map(x => x.id)
        }
      }
    })
    await new Promise(r => setTimeout(r, 3000));

  }
}

main();
