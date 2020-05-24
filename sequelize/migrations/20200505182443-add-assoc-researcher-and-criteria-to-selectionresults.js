'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "SelectionResult",
      "ResearcherId",
      {
        type: Sequelize.UUID,
        references: {
          model: "Researcher",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    )
  },

  /*
  Deixei de add o campo 'SelectionCriteriaId', pois me dei conta de que
  era um relacionamento N-N, e a tabela referente já existe.
  */


  down: (queryInterface) => {
    return queryInterface.removeColumn(
      "SelectionResult",
      "ResearcherId"
    )
  }
};
