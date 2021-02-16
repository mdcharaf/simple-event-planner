import { resolveNaptr } from 'dns';
import express, { Request, Response, Router } from 'express';
import { IEvent } from '../../db/models/event';
import { makeEventRepository } from '../../repo/eventRepository';
import { IEventService, makeEventService } from '../../services/eventService';

class EventController {
  private readonly eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  public async post(request: Request, response: Response) {
    try {
      let event: IEvent = {
        id: Date.now().toString(),
        title: request.body.title,
        subtitle: request.body.subtitle,
        description: request.body.description,
        date: new Date(request.body.date),
        ticketPrice: request.body.ticketPrice,
        address: request.body.address
      } as IEvent;

      const result = await this.eventService.createEvent(event)
      return response.status(200).json(result)

    } catch (error) {
      return response.status(400).json(error);
    }
  }

  public async get(request: Request, response: Response) {
    try {
      const data = await this.eventService.listEvents();
      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await this.eventService.removeEvent(id);
      return response.status(200).json({ message: 'Successfully Deleted' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  public async put(request: Request, response: Response)  {
    try {
      const inputEvent = this.mapRequestToEventModel(request);
      inputEvent.id = request.params.id;
      const data = await this.eventService.updateEvent(inputEvent)

      return response.status(200).json({ data });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  private mapRequestToEventModel(request: Request): IEvent {
    let event: IEvent = {
      id: Date.now().toString(),
      title: request.body.title,
      subtitle: request.body.subtitle,
      description: request.body.description,
      date: new Date(request.body.date),
      ticketPrice: request.body.ticketPrice,
      address: request.body.address
    } as IEvent;

    return event;
  }
}

// Routes

const controller: EventController = new EventController(makeEventService(makeEventRepository()));
const router: Router = express.Router();

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