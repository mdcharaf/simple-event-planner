import { IEventService, makeEventService } from '../../src/services/eventService';
import { IEventRepository } from '../../src/repo/eventRepository';
import { IEvent } from '../../src/db/models/event';
import { EventRepositoryMock } from '../mock/eventRepositoryMock';
import ModelFactory from '../utils/modelFactory';

const eventRepositoryMock: IEventRepository = new EventRepositoryMock();
const eventService: IEventService = makeEventService(eventRepositoryMock);

describe('EventServiceTests', () => {
  describe('createEvent', () => {
    it('should create and return event model ', async () => {
      // Arrange
      const eventModel: IEvent = ModelFactory.makeEvent();
      // Act
      const result: IEvent = await eventService.createEvent(eventModel);
      // Assert
      expect(result).toMatchObject(eventModel);
    });
  });

  describe('listEvents', () => {
    it('should list events', async () => {
      // Arrange, Act
      const result: IEvent[] = await eventService.listEvents();
      // Assert
      expect(result.length).toBeGreaterThan(0);
    })
  });
});