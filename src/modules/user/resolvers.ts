import { AuthenticationError } from "apollo-server-express";
import validator from 'validator';

import { generateUserToken } from "../../helpers/auth";
import * as bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { Resolver, ResolverMap } from "../../types/graphqlUtils";

type AuthPayload = {
  token: String
  user: User
}

const users: Resolver = async (): Promise<User[]> => {
  const users = User.find({});

  return users;
}

const me: Resolver = async ( _ ,__, context) => context.currentUser;

const signup: Resolver = async (_, { email, password, name }): Promise<AuthPayload> => {

  if(!validator.isEmail(email)){
    throw new Error('Invalid email')
  }

  const user = new User();

  user.name = name;
  user.password = password;
  user.email = email;

  await user.save();

  const token = generateUserToken(user.id);

  return {
    token,
    user,
  };
}

const login: Resolver = async (_, { email, password }): Promise<AuthPayload>  => {
  const user = await User.findOne({ where: { email } });
  const ERROR_MESSAGE = "Invalid Credentials."

  if (!user) {
    throw new AuthenticationError(ERROR_MESSAGE);
  }

  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    throw new AuthenticationError(ERROR_MESSAGE);
  }

  const token = generateUserToken(user.id);

  return {
    token,
    user,
  }
};

const resolvers: ResolverMap = {
  Query: {
    me,
    users
  },
  Mutation: {
    signup,
    login
  },
};

export default resolvers;
