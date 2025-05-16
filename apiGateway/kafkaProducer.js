const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'gateway-client',
  brokers: ['kafka:9092']
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner // option pour éviter le warning
});

const sendMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
  console.log(` Message envoyé sur le topic "${topic}": ${JSON.stringify(message)}`);
  await producer.disconnect();
};

module.exports = sendMessage;
