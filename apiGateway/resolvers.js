const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Charger le fichier .proto depuis taskService
const packageDefinition = protoLoader.loadSync('../taskService/task.proto', {});
const taskProto = grpc.loadPackageDefinition(packageDefinition).task;

const client = new taskProto.TaskService('localhost:50051', grpc.credentials.createInsecure());


const resolvers = {
  Query: {
    task: (_, { id }) => {
      return new Promise((resolve, reject) => {
        client.getTask({ task_id: id }, (err, response) => {
          if (err) reject(err);
          else resolve(response.task);
        });
      });
    },
    tasks: () => {
      return new Promise((resolve, reject) => {
        client.searchTasks({}, (err, response) => {
          if (err) reject(err);
          else resolve(response.tasks);
        });
      });
    }
  }
};

module.exports = resolvers;
