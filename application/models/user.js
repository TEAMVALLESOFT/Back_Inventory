module.exports = (sequelize, type) => {
    const Usuario = sequelize.define('user', {
        user_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: type.STRING,
        email: type.STRING,
        branch: type.STRING,
        phone: type.STRING,
        password: type.STRING(150)
    },{
        tableName: 'USER'
    });
    Usuario.associate = function(models) {
        // Las asociaciones con otros objetos deben ser definidos aquí.
    };
    return Usuario;
}