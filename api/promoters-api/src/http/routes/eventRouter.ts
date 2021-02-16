import { Router, Request, Response } from 'express';
import { makeEventRepository } from '../../repo/eventRepository';
import { makeEventService } from '../../services/eventService';
import { EventController } from '../controllers/eventController';

const controller: EventController = new EventController(makeEventService(makeEventRepository()));
const router: Router = Router();

router.post('/', async (req:Request, res: Response) => {
  return await controller.post(req, res);
});

router.get('/', async (req:Request, res: Response) => {
  return await controller.get(req, res);
});

router.delete('/:id', async (req:Request, res: Response) => {
  return await controller.delete(req, res);
});

router.put('/:id', async (req:Request, res: Response) => {
  return await controller.put(req, res);
});


export const EventRouter: Router = router;