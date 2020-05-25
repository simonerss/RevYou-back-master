'use strict';
var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SelectionResultSelectionCriteria', {
      id: {
        type: Sequelize.UUID,
        defaultValue: uuid(),
        allowNull: false,
        primaryKey: true,
      },
      SelectionResultId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SelectionResult',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      SelectionCriteriaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'SelectionCriteria',
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
    return queryInterface.dropTable('SelectionResultSelectionCriteria');
  }
};
