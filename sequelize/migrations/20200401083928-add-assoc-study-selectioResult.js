'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "SelectionResult",
      "StudyId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Study",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "SelectionResult",
      "StudyId"
    );
  }
};
