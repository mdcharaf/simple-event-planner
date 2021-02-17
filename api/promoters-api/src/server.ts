import express, { Express, Request, Response } from 'express';
import { makeDbContext } from './db/dbContext';
import { Sequelize } from 'sequelize-typescript';
import { Models } from './db/models.index';
import { IndexRouter } from './http/routes';
import bodyParser from 'body-parser';
import cors from 'cors';
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

function serve(): Express {
  const app: Express = express();
  const PORT = process.env.PORT || 8080;

  app.use(bodyParser.json())
  app.use('/api/v0/', IndexRouter);
  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: process.env.URL,
  }));

  app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server '));

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${process.env.URL}`);
  });

  return app;
}

(async () => {
  dotenv.config({ path: `${__dirname}/.env` });
  await initializeDb();
  serve();
})();

