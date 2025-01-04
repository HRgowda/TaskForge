// Worker processor to process the actions

import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
  clientId: 'worker_processor',
  brokers: ['localhost:9092']
})

async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker"
  })
  await consumer.connect();

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

      await new Promise(r => setTimeout(r, 500));
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
