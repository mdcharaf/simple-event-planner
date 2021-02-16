import { IEvent } from '../db/models/event';
import { IEventRepository } from "../repo/eventRepository";

export interface IEventService {
  createEvent(event: IEvent): Promise<IEvent>;
  updateEvent(event: IEvent): Promise<IEvent>;
  listEvents(): Promise<IEvent[]>;
  findEvent(eventId: string): Promise<IEvent>;
  removeEvent(eventId: string): Promise<boolean>;
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

  async updateEvent(event: IEvent): Promise<IEvent> {
    return this.repo.update(event);
  }

  async listEvents(): Promise<IEvent[]> {
    const result: IEvent[] = await this.repo.list();
    return result;
  }

  async findEvent(eventId: string): Promise<IEvent> {
    return await this.repo.find(eventId);
  }

  async removeEvent(eventId: string): Promise<boolean> {
    await this.repo.remove(eventId);
    return true;
  }
}

export function makeEventService(repo: IEventRepository): IEventService {
  return new EventService(repo);
}