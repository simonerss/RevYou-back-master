'use strict';
var constants = require('../../lib/constants');

module.exports = (sequelize, DataTypes) => {
    const Field = sequelize.define('Field', {
        type: {
            type: DataTypes.ENUM,
            values: Object.keys(constants.stepStatus).map((key) => constants.stepStatus[key])
        },
        description: DataTypes.STRING,
        option: DataTypes.ARRAY(DataTypes.STRING),
        position: DataTypes.INTEGER
    },
        { freezeTableName: true, schema: 'public' }
    );

    Field.associate = function (models) {
        models.Field.belongsTo(models.TemplateForm, {
            as: 'TemplateForm',
            onDelete: "CASCADE",
            foreignKey: { allowNull: true }
        });

        models.Field.hasMany(models.Answer, {
            as: 'Answer',
            foreignKey: 'FieldId',
            foreignKeyConstraint: true
        });
    };

    return Field;
};