import { Sequelize } from "sequelize-typescript";
const dbconfig = require('../db/config/config.json');

export async function makeDbContext() {
  const config = dbconfig[process.env.NODE_ENV as string];

  const dbContext: Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    { host: config.host, dialect: config.dialect }
  );

  try {
    await dbContext.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return dbContext;
}
