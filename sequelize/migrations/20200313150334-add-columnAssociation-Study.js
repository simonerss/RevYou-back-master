'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Study",
      "SearchId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Search",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Study",
      "SearchId"
    );
  }
};
