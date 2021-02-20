import { Request, Response, Router } from 'express';
import { IEvent } from '../../db/models/event';
import { IEventService, makeEventService } from '../../services/eventService';

export class EventController {
  private readonly eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async post(req: Request, res: Response) {
    const promoterId: Number = req.body.promoterId;

    try {
      let event: IEvent = {
        id: Date.now().toString(),
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        date: new Date(req.body.date),
        ticketPrice: req.body.ticketPrice,
        address: req.body.address,
        promoterId
      } as IEvent;

      const result = await this.eventService.createEvent(event)
      return res.status(200).json(result)

    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async get(req: Request, res: Response) {
    const promoterId: number = req.body.promoterId;

    try {
      const data = await this.eventService.listEvents(promoterId);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.eventService.removeEvent(id);
      return res.status(200).json({ message: 'Successfully Deleted' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async put(req: Request, res: Response) {
    try {
      const inputEvent = this.mapRequestToEventModel(req);
      inputEvent.id = req.params.id;
      const data = await this.eventService.updateEvent(inputEvent)

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  async publish(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.eventService.publishEvent(id);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  private mapRequestToEventModel(req: Request): IEvent {
    let event: IEvent = {
      id: Date.now().toString(),
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      date: new Date(req.body.date),
      ticketPrice: req.body.ticketPrice,
      address: req.body.address
    } as IEvent;

    return event;
  }
}