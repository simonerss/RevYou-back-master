'use strict';
var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectResearcherSearchEngine', {
      id: {
        type: Sequelize.UUID,
        defaultValue: uuid(),
        allowNull: false,
        primaryKey: true,
      },
      ProjectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Project',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ResearcherId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Researcher',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      SearchEngineId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SearchEngine',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('ProjectResearcherSearchEngine');
  }
};
