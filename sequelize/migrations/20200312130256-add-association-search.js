'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Search", 
      "ProjectId", 
      {
        type: Sequelize.UUID,
        references: {
          model: "Project", 
          key: "id" 
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Search", 
      "ProjectId"
    )
  }
};
