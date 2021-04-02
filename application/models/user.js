module.exports = (sequelize, type) => {
    const Usuario = sequelize.define('user', {
        user_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: type.STRING(45),
        email: type.STRING(45),
        branch: type.STRING(45),
        phone: type.STRING(45),
        password: type.STRING(150)
    },{
        tableName: 'user'
    });
    Usuario.associate = function(models) {
        // Las asociaciones con otros objetos deben ser definidos aquí.
    };
    return Usuario;
}