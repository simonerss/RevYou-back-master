'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "SelectionResultId",
      "SelectionCriteria"
    )
  },

  down: (queryInterface) => {
    return queryInterface.addColumn(
      "SelectionCriteria", // name of Source model
      "SelectionResultId", // name of the key we're adding
      {
        type: Sequelize.UUID,
        references: {
          model: "SelectionResult", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    )
  },
}