const { gql } = require('@apollo/server');

const typeDefs = `#graphql
  type Task {
    id: String!
    title: String!
    description: String!
    status: String!
  }

  type Query {
    task(id: String!): Task
    tasks: [Task]
  }
`;

module.exports = typeDefs;
