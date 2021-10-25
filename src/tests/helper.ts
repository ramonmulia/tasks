import { getConnection, getRepository } from "typeorm";

const getEntities = async () => {
    const entities: any[] = [];
    (await (await getConnection()).entityMetadatas).forEach(
      x => entities.push({name: x.name, tableName: x.tableName})
    );
    return entities;
  }

export const dropDb = async () => {
    try {
        for (const entity of await getEntities()) {
          const repository = getRepository(entity.name);
          await repository.query(`DELETE FROM ${entity.tableName};`);
        }
      } catch (error) {
        throw new Error(`ERROR: Cleaning test db: ${error}`);
      }
}