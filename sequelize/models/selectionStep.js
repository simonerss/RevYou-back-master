"use strict";
var constants = require("../../lib/constants");

module.exports = (sequelize, DataTypes) => {
  const SelectionStep = sequelize.define(
    "SelectionStep",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      dateChecker: DataTypes.DATE,
      dateConflicts: DataTypes.DATE,
      method: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.stepMethods).map(
          key => constants.stepMethods[key]
        )
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.stepSelectionStatus).map(
          key => constants.stepSelectionStatus[key]
        )
      },
      ratedContent: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.ratedContent).map(
          key => constants.ratedContent[key]
        )
      },
      numCheckerStudy: DataTypes.INTEGER,
      scoreBoard: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      schema: "public"
    }
  );

  SelectionStep.associate = function(models) {
    models.SelectionStep.belongsTo(models.Project, {
      as: 'Project',
      onDelete: "CASCADE",
      type: sequelize.UUID,
      foreignKey: {
        allowNull: true
      }
    });
    models.SelectionStep.hasMany(models.StudyAssigned, {
      as: 'StudyAssigned',
      foreignKey: "SelectionStepId",
      foreignKeyConstraint: true
    });

    models.SelectionStep.hasMany(models.SelectionResult, {
      as: 'SelectionResult',
      foreignKey: "SelectionStepId",
      foreignKeyConstraint: true
    });

    models.SelectionStep.belongsToMany(models.Researcher, {
      as: "Decisor",
      through: "SelectionStepDecisor",
      onDelete: "cascade"
    });

    models.SelectionStep.belongsToMany(models.Researcher, {
      as: "Checker",
      foreignKey: "ResearcherId",
      through: "SelectionStepChecker",
      onDelete: "cascade"
    });
    
  };
  //models.Project.hasMany(models., { foreignKey: 'ProjectId', foreignKeyConstraint:true });
  return SelectionStep;
};
