const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Charger le fichier .proto
const PROTO_PATH = './task.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

// Implémentation du service
const taskService = {
  getTask: (call, callback) => {
    const task = {
      id: call.request.task_id,
      title: "Faire le TP SOA",
      description: "Créer un microservice simple avec gRPC",
      status: "à faire"
    };
    callback(null, { task });
  },

  searchTasks: (call, callback) => {
    const tasks = [
      {
        id: "1",
        title: "Faire le devoir",
        description: "Maths et physique",
        status: "en cours"
      },
      {
        id: "2",
        title: "Préparer la présentation",
        description: "Projet SOA",
        status: "à faire"
      }
    ];
    callback(null, { tasks });
  }
};

// Démarrage du serveur gRPC
const server = new grpc.Server();
server.addService(taskProto.TaskService.service, taskService);

const PORT = 50051;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Erreur serveur :', err);
    return;
  }
  console.log(`✅ Microservice des tâches en cours sur le port ${port}`);
  server.start();
});
