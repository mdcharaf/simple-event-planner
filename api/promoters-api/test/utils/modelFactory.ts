import { IEvent } from '../../src/db/models/event';

export default {
  makeEvent(): IEvent {
    return {
      id: 'abcdefg',
      title: 'Jadal Concert',
      subtitle: 'Ft. Tamer',
      description: 'Join us now',
      date: new Date(2021, 12, 12),
      ticketPrice: 3250,
      address: 'Degla Maadi ST 206, Cairo',
      createdAt: new Date(2020, 12, 12),
      updatedAt: new Date(2020, 12, 12),
    } as IEvent;
  }
};