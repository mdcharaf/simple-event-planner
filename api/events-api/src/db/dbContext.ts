import { Sequelize } from "sequelize-typescript";

export async function makeDbContext() {
  const dbContext: Sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USERNAME as string,
    process.env.DB_PASSWORD as string,
    { host: process.env.DB_HOST, dialect: 'postgres' }
  );

  try {
    await dbContext.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return dbContext;
}
