module.exports = (sequelize, type) => {
    const Warehouse = sequelize.define('warehouse', {
        warehouse_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        warehouse_name: type.STRING(45),
        desc: type.STRING(100),
        address: type.STRING(45),
        user_fk: type.INTEGER
    },{
        tableName: 'warehouse'
    });
    Warehouse.associate = function(models) {
        this.belongsTo(models.Usuario,{ foreignKey: 'user_fk', as: 'Usuario'});
    };

    return Warehouse;
}