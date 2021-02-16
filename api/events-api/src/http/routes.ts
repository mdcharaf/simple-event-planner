import { resolveNaptr } from 'dns';
import { Router, Request, Response } from 'express';
import { EventRouter } from './controllers/eventController'

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Api version 00')
});

router.use('/event', EventRouter);

export const IndexRouter: Router = router; 
