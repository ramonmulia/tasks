import { gql } from 'apollo-server-express';

import userTypeDefs from './user/types';
import taskTypeDefs from './task/types';
import userResolvers from './user/resolvers';
import taskResolvers from './task/resolvers';

const root = gql`
    type Query{
        root: String
    }
    type Mutation{
        root: String
    }
`;

export const typeDefs = [root, userTypeDefs, taskTypeDefs];
export const resolvers = [userResolvers, taskResolvers];