import { startServer, stopServer } from "../server";
import { dropDb } from "./helper";

beforeAll(async () => {
  await startServer();
  await dropDb();
});

beforeEach(async () => {
  await dropDb();
})

afterAll(async () => {
  await stopServer();
})