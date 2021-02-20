import { Sequelize } from "sequelize-typescript";
import { config } from '../config';

export async function makeDbContext() {
  const dbName = config.database;
  const username = config.user;
  const password = config.password;
  const host = config.host;
  const dialect = config.dialect;

  const dbContext: Sequelize = new Sequelize(
    dbName,
    username,
    password,
    { host, dialect }
  );

  try {
    await dbContext.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return dbContext;
}
