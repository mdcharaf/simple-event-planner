import express, { Express, Request, Response } from 'express';
import { makeDbContext } from "./db/dbContext";
import { Sequelize } from "sequelize-typescript";
import { Models } from "./db/models/model.index";
import * as dotenv from 'dotenv';

async function initializeDb() {
  try {
    const dbContext: Sequelize = await makeDbContext();
    dbContext.addModels(Models);
    await dbContext.sync();
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  dotenv.config({ path: `${__dirname}/.env` });

  await initializeDb();

  // const app: Express = express();
  // const PORT = process.env.PORT || 8080;
  // console.log('Events db synced');

  // app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));
  // app.listen(PORT, () => {
  //   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  // });
})();

