"use strict";
var constants = require("../../lib/constants");

module.exports = (sequelize, DataTypes) => {
  const ExtractionStep = sequelize.define(
    "ExtractionStep",
    {
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      dateExtractor: DataTypes.DATE,
      dateConflicts: DataTypes.DATE,
      method: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.stepMethods).map((key) => constants.stepMethods[key])
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.stepStatus).map((key) => constants.stepStatus[key])
      },
      numExtractorStudy: DataTypes.INTEGER,
      scoreBoard: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
      schema: "public"
    }
  );

  ExtractionStep.associate = function(models) {
    
    models.ExtractionStep.belongsTo(models.Project, {
      as: 'Project',
      onDelete: "CASCADE",
      type: sequelize.UUID,
      foreignKey: {
        allowNull: true
      }
    });

    models.ExtractionStep.hasOne(models.TemplateForm, {
      as: 'TemplateForm',
      foreignKey: "ExtractionStepId",
      foreignKeyConstraint: true
    });

    models.ExtractionStep.belongsToMany(models.Researcher, {
      as: "Decisor",
      through: "ExtractionStepDecisor",
      onDelete: "cascade"
    });

    models.ExtractionStep.belongsToMany(models.Researcher, {
      as: "Extractor",
      through: "ExtractionStepExtractor",
      onDelete: "cascade"
    });

  };

  return ExtractionStep;
};
