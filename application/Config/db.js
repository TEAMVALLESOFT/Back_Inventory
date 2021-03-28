const Sequelize = require('sequelize');

const UserModel = require('../models/user');

const sequelize = new Sequelize('Database_name', 'user_name', 'password', {
    host: 'host_name',
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
