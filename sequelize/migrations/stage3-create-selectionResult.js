'use strict';
var uuid = require('uuid/v4');
var constants = require('../../lib/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionResult", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.selectionResultStatus).map((key) => constants.selectionResultStatus[key])
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
    return queryInterface.dropTable("SelectionResult");
  }
};
