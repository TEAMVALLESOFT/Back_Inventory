const Sequelize = require('sequelize');

const UserModel = require('../models/user');
const WarehouseModel = require('../models/warehouse');

const sequelize = new Sequelize('Database_name', 'user_name', 'password', {
    host: 'host_name',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);
const Warehouse = WarehouseModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('tablas sincronizadas');
    })

module.exports = {
    User,
    Warehouse
}