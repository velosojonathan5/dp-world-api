'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Companies',
      'objectOfContract',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Companies', 'objectOfContract');
  }
};
