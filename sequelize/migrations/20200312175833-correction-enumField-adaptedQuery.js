'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        "AutomaticSearch",
        "searchField",
        { type: Sequelize.ENUM('Title', 'Abstract', 'Keywords', 'Full Text') }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "AutomaticSearch",
      "searchField"
    )
  }
}
