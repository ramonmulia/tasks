import { User } from "entity/User";
import { Request, Response } from "express";
import { userLoader } from "../loaders/userLoader";

export interface Context {
  req: Request;
  res: Response;
  
  userLoader: ReturnType<typeof userLoader>;
  authToken: string | null;
  currentUser: User | null;
} 

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;


export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}
