"use strict";
var uuid = require("uuid/v4");
var constants = require("../../lib/constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionCriteria", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      description: { type: Sequelize.STRING },
      criteriaType: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.criteriaType).map(
          key => constants.criteriaType[key]
        )
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
    return queryInterface.dropTable("SelectionCriteria");
  }
};
