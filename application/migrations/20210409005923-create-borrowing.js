'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('borrowings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      auth_state: {
        type: Sequelize.STRING
      },
      pick_up_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      return_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      obs: {
        type: Sequelize.STRING
      },
      user_fk: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('borrowings');
  }
};