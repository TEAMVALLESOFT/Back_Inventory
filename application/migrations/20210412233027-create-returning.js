'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('returnings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      auth_state: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'aprobado, denegado, pendiente'
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'funcional, no funcional, incompleto'

      },
      obs: {
        type: Sequelize.STRING
      },
      borrowing_fk: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      auth_user_fk: {
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
    await queryInterface.dropTable('returnings');
  }
};