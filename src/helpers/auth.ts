import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

import { User } from "../entity/User";
import { Context } from "../types/graphqlUtils";

const tradeTokenForUser = async (token: string): Promise<User> => { 
  const jwtObject = jwt.verify(token, process.env.APP_SECRET as string) as any;

  if (!jwtObject?.userId) {
    throw new AuthenticationError("Unauthorized User");
  }

  const userFound = await User.findOne({ id: jwtObject.userId });

  if (!userFound) {
    throw new AuthenticationError("Unauthorized User");
  }

  return userFound;
};

export const contextBuilder = async (context: Context): Promise<Context> => {
  let authToken = null;
  let currentUser = null;

  try {
    authToken = context.req.headers.authorization || "";

    if (authToken) {
      authToken = authToken.replace("Bearer ", "");
      currentUser = await tradeTokenForUser(authToken);
    }
  } catch (e) {
    console.warn(`Unable to authenticate using auth token: ${e}`);
  }

  return {
    ...context,
    authToken,
    currentUser,
  };
};

export const generateUserToken = (userId: string) =>
  jwt.sign({ userId }, process.env.APP_SECRET as string);

export const getAuthenticatedUser = (context: Context) => {
  if (!context.currentUser) {
    throw new AuthenticationError("User is not authenticated.");
  }

  return context.currentUser;
};
