"use strict";
var constants = require("../../lib/constants");

module.exports = (sequelize, DataTypes) => {
  const StudyAssigned = sequelize.define(
    "StudyAssigned",
    {
      assignDate: DataTypes.DATE,
      examinationDate: DataTypes.DATE,
      status: {
        type: DataTypes.ENUM,
        values: Object.keys(constants.studyAssignedStatus).map(
          key => constants.studyAssignedStatus[key]
        )
      }
    },
    {
      freezeTableName: true,
      schema: "public"
    }
  );

  StudyAssigned.associate = function(models) {
    models.StudyAssigned.belongsTo(models.Study, {
      as: "Study",
      onDelete: "CASCADE",
      type: sequelize.UUID,
      foreignKey: {
        allowNull: true
      }
    });

    models.StudyAssigned.belongsTo(models.SelectionStep, {
      as: "SelectionStep",
      onDelete: "CASCADE",
      type: sequelize.UUID,
      foreignKey: {
        allowNull: true
      }
    });

    models.StudyAssigned.belongsTo(models.Researcher, {
      as: "Researcher",
      onDelete: "CASCADE",
      type: sequelize.UUID,
      foreignKey: {
        allowNull: true
      }
    });

  };
  //models.Project.hasMany(models., { foreignKey: 'ProjectId', foreignKeyConstraint:true });
  return StudyAssigned;
};
