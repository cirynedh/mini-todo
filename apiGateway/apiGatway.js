const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const sendMessage = require('./kafkaProducer');

async function startServer() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());


  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();


  app.use('/graphql', expressMiddleware(server));


  app.get('/tasks', (req, res) => {
    resolvers.Query.tasks()
      .then(data => res.json(data))
      .catch(err => {
        console.error('Erreur GET /tasks:', err);
        res.status(500).json({ error: 'Erreur serveur' });
      });
  });

  app.get('/tasks/:id', (req, res) => {
    resolvers.Query.task(null, { id: req.params.id })
      .then(data => {
        if (!data) {
          return res.status(404).json({ error: 'Tâche non trouvée' });
        }
        res.json(data);
      })
      .catch(err => {
        console.error('Erreur GET /tasks/:id:', err);
        res.status(500).json({ error: 'Erreur serveur' });
      });
  });

  // REST endpoint POST /tasks - ajoute une tâche et envoie un message Kafka
app.post('/tasks', async (req, res) => {
  try {
    const task = req.body;
    // Commenter temporairement l'envoi Kafka
    // await sendMessage('tasks_topic', task);
    res.status(201).json({ message: 'Tâche reçue (Kafka désactivé temporairement)', task });
  } catch (err) {
    console.error('Erreur POST /tasks:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`✅ API Gateway en cours sur http://localhost:${PORT}`);
    console.log(`📡 GraphQL dispo sur http://localhost:${PORT}/graphql`);
  });
}

startServer();
