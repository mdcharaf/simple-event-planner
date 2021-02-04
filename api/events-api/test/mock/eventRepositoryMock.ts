import { IEvent } from '../../src/db/models/event';
import { IEventRepository } from '../../src/repo/eventRepository';
import ModelFactory from '../utils/modelFactory';

export class EventRepositoryMock implements IEventRepository {
  constructor(private readonly event: IEvent = ModelFactory.makeEvent()) {
  }

  async create(event: IEvent): Promise<IEvent> {
    return event
  }

  async find(id: string): Promise<IEvent> {
    return this.event;
  }

}