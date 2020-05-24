'use strict';

module.exports = (sequelize, DataTypes) => {
    const ManualSearch = sequelize.define('ManualSearch', {
        id: { type: DataTypes.STRING(50), primaryKey: true },
    }, { freezeTableName: true, schema: 'public' });

    ManualSearch.associate = function (models) {

        models.ManualSearch.belongsTo(models.Search, {
            as: 'Search',
            foreignKey: {
                name: 'SearchId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });
    }

    return ManualSearch;
};