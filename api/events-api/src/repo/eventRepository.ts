import { Event, IEvent } from '../db/models/event';

export interface IEventRepository {
  create(event: IEvent): Promise<IEvent>;
  find(id: string): Promise<IEvent>;
}

export class EventRepository implements IEventRepository {
  async create(event: IEvent): Promise<IEvent> {
    return await Event.create(event);
  }

  async find(id: string): Promise<IEvent> {
    return await Event.findByPk(id);
  }
}

export function makeEventRepository(): IEventRepository {
  return new EventRepository();
}