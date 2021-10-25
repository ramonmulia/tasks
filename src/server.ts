require("dotenv").config();
import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import { typeDefs, resolvers } from "./modules";
import { contextBuilder } from "./helpers/auth";
import { startDB } from "./db";

const app = express();

const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextBuilder,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export const startServer = async (): Promise<void> => {
  await startDB();

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(`🚀 Server ready and running at ${server.graphqlPath}`);
};

export const stopServer = () => {
  return server.stop();
}