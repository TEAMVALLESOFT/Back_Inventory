const db = require('../models');

exports.create = async (req, res, next) => {
    try {
        const parent = await db.article_type.findOne({ where: { id: req.body.article_type_fk } });
        if (parent != null) {
            if (parent.is_parent === 0) {
                var count = await db.article.count({}) + 1;
                var article_label = parent.classif.substring(0, 3) + req.body.branch.substring(0, 3) + '_' + count;
                const registro = await db.article.create({
                    label: article_label,
                    available_state: req.body.available_state,
                    physical_state: req.body.physical_state,
                    branch: req.body.branch,
                    warehouse_fk: req.body.warehouse_fk,
                    article_type_fk: req.body.article_type_fk
                });
                res.status(200).send({
                    message: 'El artículo fue creado con éxito.'
                });
            }
            else {
                const array = req.body.secondary_article_list;
                if (array != null) {
                    let ican = 0;
                    for (var j = 0; j < array.length; j++) {
                        const type = await db.article_type.findOne({ where: { id: array[j].article_type_fk } });
                        if (type.is_parent === 0) {
                            ican += 1;
                        }
                        else {
                            ican = ican;
                        }
                    }
                    if (ican === array.length) {
                        var count = await db.article.count({}) + 1;
                        var article_label = parent.classif.substring(0, 3) + req.body.branch.substring(0, 3) + '_' + count;
                        const registro = await db.article.create({
                            label: article_label,
                            available_state: req.body.available_state,
                            physical_state: req.body.physical_state,
                            branch: req.body.branch,
                            warehouse_fk: req.body.warehouse_fk,
                            article_type_fk: req.body.article_type_fk
                        });
                        const ObjectParent = await db.article.findOne({ where: { id: registro.id } });
                        if (ObjectParent) {
                            for (var i = 0; i < array.length; i++) {
                                const type = await db.article_type.findOne({ where: { id: array[i].article_type_fk } });
                                if (type.is_parent === 0) {
                                    var count = await db.article.count({}) + 1;
                                    var articlelabel = type.classif.substring(0, 3) + array[i].branch.substring(0, 3) + '_' + count;
                                    const registro = await db.article.create({
                                        label: articlelabel,
                                        available_state: array[i].available_state,
                                        physical_state: array[i].physical_state,
                                        branch: array[i].branch,
                                        warehouse_fk: array[i].warehouse_fk,
                                        article_type_fk: type.id,
                                        article_fk: ObjectParent.id
                                    });
                                }
                            }

                        }
                        res.status(200).send({
                            message: 'El artículo fue creado con éxito.'
                        });
                    }

                    else {
                        res.status(404).send({
                            message: 'No es posible realizar la creación y asociación del artículo.'
                        });
                    }
                }
                else {
                    res.status(404).send({
                        message: 'No es posible realizar la asociación del artículo.'
                    });
                }
            }
        }
        else {
            res.status(404).send({
                message: 'No se encontro el tipo de artículo.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor.!'
        });
        next(error);
    }
};
