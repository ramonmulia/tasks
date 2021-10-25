import { gql } from 'apollo-server-express';

export default gql`
  enum Status {
    TO_DO
    IN_PROGRESS
    DONE
    ARCHIVED
  }

  type Task {
    id: ID!
    title: String
    description: String
    status: Status
  }

  extend type Query {
    tasks: [Task]
  }

  extend type Mutation {
    createTask(title: String!, description: String!, status: Status): Task
    updateStatus(taskId: ID!, status: Status!): Task
  }
`;
