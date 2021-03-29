module.exports = (sequelize, type) => {
    const Warehouse = sequelize.define('warehouse', {
        warehouse_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        warehouse_name: type.STRING,
        desc: type.STRING,
        address: type.STRING,
        user_fk: type.INTEGER
    },{
        tableName: 'WAREHOUSE'
    });
    Warehouse.associate = function(models) {
        this.belongsTo(models.Usuario,{ foreignKey: 'user_fk', as: 'Usuario'});
    };

    return Warehouse;
}