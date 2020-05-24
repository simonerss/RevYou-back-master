'use strict';
module.exports = (sequelize, DataTypes) => {
    const SearchKeyword = sequelize.define('SearchKeyword', {
      id: {type: DataTypes.STRING(50), primaryKey: true},
      keyword: DataTypes.STRING
    }, {freezeTableName: true, schema: 'public'});

    return SearchKeyword;
};