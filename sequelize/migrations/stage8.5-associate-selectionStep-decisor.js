"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("SelectionStepDecisor", {
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
    return queryInterface.dropTable("SelectionStepDecisor");
  }
};
