import express, { Request, Response, Router } from 'express';
import { IEvent } from '../../../db/models/event';
import { makeEventRepository } from '../../../repo/eventRepository';
import { IEventService, makeEventService } from '../../../services/eventService';

const router: Router = express.Router();
const eventService: IEventService = makeEventService(makeEventRepository());

router.get('/event', async (req: Request, res: Response) => {
  const events: IEvent[] = await eventService.listEvents();

  return res.json({ events });
});