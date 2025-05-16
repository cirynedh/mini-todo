const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'mon-consumer',
  brokers: ['localhost:9092']  // Remplace 'localhost' par l'adresse de ton broker Kafka si besoin
});

const consumer = kafka.consumer({ groupId: 'mon-groupe' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'tasks_topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(` Message reçu : ${message.value.toString()}`);
    }
  });
}

run().catch(console.error);
