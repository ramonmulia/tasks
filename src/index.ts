import { startServer } from "./server";

const init = async (): Promise<void> => {
  try {
    await startServer();
  } catch (error: any) {
    console.log(`Error while starting server: ${error}`);
    process.exit(1);
  }
};

init();
