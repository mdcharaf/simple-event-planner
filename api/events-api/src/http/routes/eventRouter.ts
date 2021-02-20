import { Router, Request, Response } from 'express';
import { makeEventRepository } from '../../services/repo/eventRepository';
import { makeEventService } from '../../services/eventService';
import { EventController } from '../controllers/eventController';
import { auth } from '../middlewares/authMiddleware';

const controller: EventController = new EventController(makeEventService(makeEventRepository()));
const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  return await controller.post(req, res);
});

router.get('/', auth, async (req: Request, res: Response) => {
  return await controller.get(req, res);
});

router.delete('/:id', auth, async (req: Request, res: Response) => {
  return await controller.delete(req, res);
});

router.put('/:id', auth, async (req: Request, res: Response) => {
  return await controller.put(req, res);
});

router.post('/:id/publish', auth, async (req: Request, res: Response) => {
  return await controller.publish(req, res);
});


export const EventRouter: Router = router;