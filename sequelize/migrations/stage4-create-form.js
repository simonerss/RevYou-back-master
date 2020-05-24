'use strict';
var uuid = require('uuid/v4');
var constants = require('../../lib/constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Form", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.formTypes).map((key) => constants.formTypes[key])
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.formStatus).map((key) => constants.formStatus[key])
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
    return queryInterface.dropTable("Form");
  }
};
