'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "AutomaticSearch",
      "AdaptedQueryId"
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "AutomaticSearch",
      "AdaptedQueryId",
      {
        type: Sequelize.UUID,
        references: {
          model: "AdaptedQuery",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  }
};
