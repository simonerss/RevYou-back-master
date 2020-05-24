"use strict";
var uuid = require("uuid/v4");
var constants = require("../../lib/constants");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("StudyAssigned", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      assignDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      examinationDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: Object.keys(constants.studyAssignedStatus).map(
          key => constants.studyAssignedStatus[key]
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
    return queryInterface.dropTable("StudyAssigned");
  }
};
