import { Event, IEvent } from '../db/models/event';

export interface IEventRepository {
  create(event: IEvent): Promise<IEvent>;
  update(event: IEvent): Promise<IEvent>;
  find(id: string): Promise<IEvent>;
  list(): Promise<IEvent[]>;
  remove(id: string): Promise<boolean>;
}

export class EventRepository implements IEventRepository {
  async create(event: IEvent): Promise<IEvent> {
    return await Event.create(event);
  }

  async update(event: IEvent): Promise<IEvent> {
    const dbEvent: Event = await Event.findByPk(event.id);

    const result = await dbEvent.update({
      title: event.title,
      subtitle: event.subtitle,
      description: event.description,
      date: event.date,
      ticketPrice: event.ticketPrice,
      address: event.address
    });

    return result;
  }
  
  async find(id: string): Promise<IEvent> {
    return await Event.findByPk(id);
  }

  async list(): Promise<IEvent[]> {
    return await Event.findAll();
  }

  async remove(id: string): Promise<boolean> {
    await Event.destroy({
      where: {
        id
      }
    });
    return true;
  }
}

export function makeEventRepository(): IEventRepository {
  return new EventRepository();
}