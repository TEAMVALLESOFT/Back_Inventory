module.exports = (sequelize, type) => {
    return sequelize.define('user', {
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
    })
}