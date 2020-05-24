'use strict';

var uuid = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Study', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
      },
      title: {
        type: Sequelize.TEXT
      },
      authors: {
        type: Sequelize.TEXT
      },
      citekey:{
        type: Sequelize.TEXT
      },
      abstract:{
        type: Sequelize.TEXT
      },
      keywords: {
        type: Sequelize.TEXT
      },
      venue: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      issn: {
        type: Sequelize.STRING
      },
      doi: {
        type: Sequelize.STRING
      },
      base: {
        type: Sequelize.STRING
      },
      search:{
        type: Sequelize.INTEGER
      },
      generalStatus: {
        type: Sequelize.ENUM('Unclassified', 'Duplicated', 'Included', 'Excluded')
      },
      venueType: {
        type: Sequelize.ENUM('Journal', 'Conferecence Pronceendings', 'Technical Report', 'Thesis', 'Book')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Study');
  }
};