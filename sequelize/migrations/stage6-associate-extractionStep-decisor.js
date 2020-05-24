'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ExtractionStepDecisor',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        ExtractionStepId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        ResearcherId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
      }
);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ExtractionStepDecisor');
  }
};
