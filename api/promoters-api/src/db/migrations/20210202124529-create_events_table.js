'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('Events',{
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      subtitle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ticketPrice: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
},

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('Events');
  }
};
