module.exports = (sequelize, type) => {
    const Tipo = sequelize.define('type',{
        article_type_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        article_type_name: type.STRING(45),
        is_parent: type.TINYINT,
        desc: type.STRING(100),
        classif: type.STRING(45)
    },{
        tableName: 'article_type'
    });

    return Tipo;
}