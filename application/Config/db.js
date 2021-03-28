const Sequelize = require('sequelize');

const UserModel = require('../models/user');

const sequelize = new Sequelize('SicDMSiMjC', 'SicDMSiMjC', 'QTnWiJvXZ7', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    })

module.exports = {
    User
}