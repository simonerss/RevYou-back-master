'use strict';
var constants = require('../../lib/constants');

module.exports = (sequelize, DataTypes) => {
  const SelectionResult = sequelize.define('SelectionResult', {
    status: {
      id: { type: DataTypes.STRING(50), primaryKey: true },
      type: DataTypes.ENUM,
      values: Object.keys(constants.selectionResultStatus).map((key) => constants.selectionResultStatus[key])
    }
  },
    { freezeTableName: true, schema: 'public' }
  );

  SelectionResult.associate = function (models) {    
    models.SelectionResult.belongsTo(models.Study, {
      as: 'StudyOwner',
      onDelete: "CASCADE",
      foreignKey: "StudyId"
    });
    
    models.SelectionResult.belongsTo(models.Researcher, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true
      }
    });
  
    models.SelectionResult.belongsToMany(models.SelectionCriteria, {
      as: 'SelectionCriteria',
      through: 'SelectionResultSelectionCriteria',
      onDelete: "cascade"
    });
  };

  return SelectionResult;
};