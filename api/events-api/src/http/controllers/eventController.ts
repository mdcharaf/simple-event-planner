import { Request, Response, Router } from 'express';
import { IEvent } from '../../db/models/event';
import { IEventService, makeEventService } from '../../services/eventService';

export class EventController {
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