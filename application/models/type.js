module.exports = (sequelize, type) => {
    const Tipo = sequelize.define('type',{
        article_type_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        article_type_name: type.STRING,
        is_parent: type.TINYINT,
        desc: type.STRING,
        classif: type.STRING
    },{
        tableName: 'TYPE_ARTICLE'
    });

    return Tipo;
}