import { IEvent } from '../db/models/event';
import { IEventRepository } from "../repo/eventRepository";

export interface IEventService {
  createEvent(event: IEvent): Promise<IEvent>;
  listEvents(): Promise<IEvent[]>;
};

export class EventService implements IEventService {
  private readonly repo: IEventRepository;

  constructor(repo: IEventRepository) {
    this.repo = repo;
  }

  async createEvent(inputEvent: IEvent): Promise<IEvent> {
    const result: IEvent = await this.repo.create(inputEvent);

    return result;
  }

  async listEvents(): Promise<IEvent[]> {
    const result: IEvent[] = await this.repo.list();

    return result;
  }
}

export function makeEventService(repo: IEventRepository): IEventService {
  return new EventService(repo);
}