'use strict';

module.exports = (sequelize, DataTypes) => {
    const AutomaticSearch = sequelize.define('AutomaticSearch', {
        id: { type: DataTypes.STRING(50), primaryKey: true },
        method: DataTypes.ENUM('Snowballing', 'Machine Learning'),
        searchField: DataTypes.ENUM('Title', 'Abstract', 'Keywords', 'Full Text'),
    }, { freezeTableName: true, schema: 'public' });

    AutomaticSearch.associate = function (models) {

        models.AutomaticSearch.belongsTo(models.Search, {
            as: 'Search',
            foreignKey: {
                name: 'SearchId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });

        models.AutomaticSearch.hasMany(models.AdaptedQuery, {
            as: 'AdaptedQuery',
            foreignKey: {
                name: 'AutomaticSearchId',
                allowNull: false
            },
            foreignKeyConstraint: true
        });
    }

    return AutomaticSearch;
};