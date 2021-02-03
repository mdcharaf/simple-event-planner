import { Event, IEvent } from '../db/models/event';

export interface IEventRepository {
  create(event: IEvent): Promise<IEvent>;
}

class EventRepository implements IEventRepository {
  async create(event: IEvent): Promise<IEvent> {
    return await Event.create(event);
  }
}
