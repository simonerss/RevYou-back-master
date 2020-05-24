"use strict";
var uuid = require("uuid/v4");
var constants = require("../../lib/constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionStep", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateChecker: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dateConflicts: {
        allowNull: false,
        type: Sequelize.DATE
      },
      method: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.stepMethods).map(
          key => constants.stepMethods[key]
        )
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.stepSelectionStatus).map(
          key => constants.stepSelectionStatus[key]
        )
      },
      ratedContent: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: Object.keys(constants.ratedContent).map(
          key => constants.ratedContent[key]
        )
      },
      numCheckerStudy: {
        type: Sequelize.INTEGER
      },
      scoreBoard: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("SelectionStep");
  }
};
