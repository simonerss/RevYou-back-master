'use strict';
var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Project", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      objective: {
        type: Sequelize.TEXT
      },
      reviewType: {
        type: Sequelize.ENUM('Systematic Review', 'Systematic Mapping', 'Not Systematic')
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

  down: (queryInterface) => {
    return queryInterface.dropTable("Project");
  }
};