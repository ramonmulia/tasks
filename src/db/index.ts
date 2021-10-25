import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const startDB = async (): Promise<Connection> => {
  let retries: number = 5;

  while (!!retries) {
    try {
      const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
      const conn = await createConnection({ ...connectionOptions, name: 'default' });
      return conn;
    } catch (err) {
      retries--;
      console.error(`Error to connect. Retrying: ${retries}`, err);

      //wait for 500 milisecs to try again
      await new Promise(res => setTimeout(res, 500));
    }
  }

    throw new Error('Fail to connect to DB');
};
