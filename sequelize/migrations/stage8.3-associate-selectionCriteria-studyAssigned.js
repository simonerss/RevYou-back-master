"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionCriteriaStudyAssigned", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SelectionCriteriapId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      StudyAssignedId: {
        type: Sequelize.UUID,
        primaryKey: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SelectionCriteriaStudyAssigned");
  }
};
