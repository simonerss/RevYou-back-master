'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ProjectsLanguages',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        ProjectId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        LanguageId: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
      }
);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectsLanguages');
  }
};