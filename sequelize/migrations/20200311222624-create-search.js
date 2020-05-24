'use strict';
var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Search', {
      id: {
        type: Sequelize.UUID,
        defaultValue: uuid(),
        allowNull: false,
        primaryKey: true,
      },
      executionDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      name: {
        type: Sequelize.TEXT
      },
      order:{
        type: Sequelize.INTEGER
      },
      description:{
        type: Sequelize.TEXT
      },
      createdAt: {        
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Search');
  }
};
