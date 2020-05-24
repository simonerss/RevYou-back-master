'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "AdaptedQuery",
      "AutomaticSearchId",
      {
        type: Sequelize.UUID,
        references: {
          model: "AutomaticSearch",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        "AdaptedQuery",
        "StandardQueryId",
        {
          type: Sequelize.UUID,
          references: {
            model: "StandardQuery",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "AdaptedQuery",
      "AutomaticSearchId"
    )
    .then(() => {
      return queryInterface.removeColumn(
        "AdaptedQuery",
        "StandardQueryId"
      )
    })
  }
};
