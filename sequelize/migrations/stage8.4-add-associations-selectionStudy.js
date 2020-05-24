"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "SelectionResult", // name of Source model
        "SelectionStepId", // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: "SelectionStep", // name of Target model
            key: "id" // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL"
        }
      )
      .then(() => {
        return queryInterface.addColumn(
          "StudyAssigned",
          "SelectionStepId",

          {
            type: Sequelize.UUID,
            references: {
              model: "SelectionStep", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn(
          "StudyAssigned",
          "StudyId",

          {
            type: Sequelize.UUID,
            references: {
              model: "Study", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn(
          "StudyAssigned",
          "ResearcherId",

          {
            type: Sequelize.UUID,
            references: {
              model: "Researcher", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn(
          "SelectionStep",
          "ProjectId",

          {
            type: Sequelize.UUID,
            references: {
              model: "Project", // name of Target model
              key: "id" // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL"
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "SelectionResult", // name of Source model
        "SelectionStepId" // key we want to remove
      )
      .then(() => {
        return queryInterface.removeColumn(
          "StudyAssigned", // name of Source model
          "SelectionStepId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "StudyAssigned", // name of Source model
          "StudyId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "StudyAssigned", // name of Source model
          "ResearcherId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.removeColumn(
          "SelectionStep", // name of Source model
          "ProjectId" // key we want to remove
        );
      });
  }
};
