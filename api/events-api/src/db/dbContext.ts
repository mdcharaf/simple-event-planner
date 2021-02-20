import { Sequelize } from "sequelize-typescript";

export async function makeDbContext() {
  const dbName = process.env.DB_NAME as string;
  const username = process.env.DB_USERNAME as string;
  const password = process.env.DB_PASSWORD as string;
  const host = process.env.DB_HOST as string;

  const dbContext: Sequelize = new Sequelize(
    dbName,
    username,
    password,
    { host, dialect: 'postgres' }
  );

  try {
    await dbContext.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return dbContext;
}
