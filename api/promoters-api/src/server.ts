import express, { Express, Request, Response } from 'express';
import { makeDbContext } from './db/dbContext';
import { Sequelize } from 'sequelize-typescript';
import { Models } from './db/models.index';
import { IndexRouter } from './http/routes';
import { config } from './config';
import bodyParser from 'body-parser';
import cors from 'cors';
import { log } from 'console';

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
  const PORT = config.PORT || 8080;

  app.use(bodyParser.json())
  app.use('/api/v0/', IndexRouter);
  app.use(cors({
    allowedHeaders: [
      'Origin', 'X-Requested-With',
      'Content-Type', 'Accept',
      'X-Access-Token', 'Authorization',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: config.PORT,
  }));

  app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server '));

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${config.URL}`);
  });

  return app;
}

(async () => {
  await initializeDb();
  serve();
})();