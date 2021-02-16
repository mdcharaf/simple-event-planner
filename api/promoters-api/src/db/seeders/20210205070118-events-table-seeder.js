'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [{
      id: 'abcdefg',
      title: 'Jadal',
      subtitle: 'Ft. Marchemello',
      description: 'For tickets call 01000000000',
      date: new Date(2021, 12, 12),
      ticketPrice: 3250,
      address: 'Cairo Festival City Mall, 5th Settlment Cairo Egypt',
      isPublished: false,
      createdAt: new Date(2020, 12, 12),
      updatedAt: new Date(2020, 12, 12),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
