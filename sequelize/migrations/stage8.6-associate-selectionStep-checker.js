"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionStepChecker", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      SelectionStepId: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      ResearcherId: {
        type: Sequelize.UUID,
        primaryKey: true
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SelectionStepChecker");
  }
};
