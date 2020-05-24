'use strict';

var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MainQuestion', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      description: {
        type: Sequelize.TEXT
      },
      population: {
        type: Sequelize.TEXT
      },
      intervation:{
        type: Sequelize.TEXT
      },
      control: {
        type: Sequelize.TEXT
      },
      results: {
        type: Sequelize.TEXT
      },
      context: {
        type: Sequelize.TEXT
      },
      design: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MainQuestion');
  }
};