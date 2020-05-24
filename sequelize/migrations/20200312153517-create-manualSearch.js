'use strict';
var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ManualSearch', {
      id: {
        type: Sequelize.UUID,
        defaultValue: uuid(),
        allowNull: false,
        primaryKey: true,
      },
      SearchId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { 
          model: 'Search',
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
    return queryInterface.dropTable('ManualSearch');
  }
};
