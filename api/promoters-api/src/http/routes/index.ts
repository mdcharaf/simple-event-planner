import { Router, Request, Response } from 'express';
import { AuthRouter } from './authRouter';
import { EventRouter } from './eventRouter';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Api version 00')
});

router.use('/event', EventRouter);
router.use('/promoter', AuthRouter);

export const IndexRouter: Router = router; 
