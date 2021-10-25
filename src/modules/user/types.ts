import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload!
  }

  extend type Query{
    me: User
    users: [User]
  }
`;
