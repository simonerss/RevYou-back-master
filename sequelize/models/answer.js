'use strict';
var constants = require('../../lib/constants');

module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('Answer', {
        content: DataTypes.TEXT,
        supportData: DataTypes.TEXT,
        option: DataTypes.ARRAY(DataTypes.STRING),
        status: {
            type:   DataTypes.ENUM,
            values: Object.keys(constants.answerStatus).map((key) => constants.answerStatus[key])
        },
    },
    { freezeTableName: true, schema: 'public' });

    Answer.associate = function (models) {
      models.Answer.belongsTo(models.Form, {
        onDelete: "CASCADE",
        foreignKey: { allowNull: true }
      });

      models.Answer.belongsTo(models.Field, {
        onDelete: "CASCADE",
        foreignKey: { allowNull: true }
      });        
    };

    return Answer;
};