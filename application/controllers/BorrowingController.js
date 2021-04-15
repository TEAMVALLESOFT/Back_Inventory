const db = require('../models');

exports.create = async (req, res, next) => {
    try {
        const User = await db.user.findOne({ where: { id: req.body.user_id } });
        if (User != null) {
            const array = req.body.article_list;
            if (array != null) {
                let ican = 0;
                for (var j = 0; j < array.length; j++) {
                    const type = await db.article.findOne({ where: { id: array[j].article_id } });
                    if (type) {
                        ican += 1;
                    }
                    else {
                        ican = ican;
                    }
                }
                if (ican === array.length) {
                    const registro = await db.borrowing.create({
                        user_fk: req.body.user_id,
                        auth_state: "Pendiente",
                        pick_up_date: req.body.pick_up_date,
                        return_date: req.body.return_date,
                        obs: req.body.obs,
                        has_returning: 0,
                    });
                    const borrowing = await db.borrowing.findOne({ where: { id: registro.id } });
                    if (borrowing != null) {
                        for (var i = 0; i < array.length; i++) {
                            const reservacion = await db.reservation.create({
                                article_fk: array[i].article_id,
                                borrowing_fk: borrowing.id,
                            });
                        }
                    }
                    res.status(200).send({
                        message: 'El Préstamo fue creado con éxito.'
                    });
                }
                else {
                    res.status(404).send({
                        message: 'No seleccionó un artículo existente.'
                    });
                }
            }
            else {
                res.status(404).send({
                    message: 'No se encontraron los artículos.'
                });
            }
        }
        else {
            res.status(404).send({
                message: 'No se encontro el usuario.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor.!'
        });
        next(error);
    }
};

exports.list = async (req, res, next) => {
    try {
        const { has_returning } = req.query;
        if (has_returning == 'false') {
            const borro = await db.borrowing.findAndCountAll({
                where: {
                    has_returning: 0,
                    auth_state: 'Aprobada'
                },
                include: [{
                    model: db.user,
                    attributes: ['user_name', 'email'],
                    required: true,
                    as: 'Asociado'
                }, {
                    model: db.user,
                    attributes: ['user_name', 'email'],
                    as: 'Autoriza'
                }]
            });
            if (borro.count != 0) {
                res.status(200).json(borro);
            } else {
                res.status(404).send({
                    message: 'No hay registros en el sistema.'
                });
            }
        }
        else {
            const borro = await db.borrowing.findAndCountAll({
                include: [{
                    model: db.user,
                    attributes: ['user_name', 'email'],
                    required: true,
                    as: 'Asociado'
                }, {
                    model: db.user,
                    attributes: ['user_name', 'email'],
                    as: 'Autoriza'
                }]

            });
            if (borro.count != 0) {
                res.status(200).json(borro);
            } else {
                res.status(204).send({
                    message: 'No hay registros en el sistema.'
                });
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: '¡Error en el servidor!.' });

    }
};

exports.detail = async (req, res, next) => {
    const { borrowing_id } = req.query;
    try {

        const borro = await db.borrowing.findAndCountAll({
            where: { id: borrowing_id },
            include: [{
                model: db.user,
                attributes: ['user_name', 'email'],
                required: true,
                as: 'Asociado'
            }, {
                model: db.user,
                attributes: ['user_name', 'email'],
                as: 'Autoriza'
            }]

        });

        const array = [];
        var datareal = [];
        for (var i = 0; i < borro.count; i++) {
            console.log("a");
            var element = await db.reservation.findAndCountAll({
                attributes: ['id', 'borrowing_fk', 'article_fk'],
                where: { borrowing_fk: borro.rows[i].id },
                include: {
                    model: db.article,
                    attributes: ['label', 'id', 'warehouse_fk', 'article_type_fk'],
                    as: 'Articulo',
                   
                    
                    include: [{
                        model: db.article_type,
                        attributes: ['classif', 'article_type_name'],
                        as: 'Tipo',
                    },
                    {
                        model: db.warehouse,
                        attributes: ['warehouse_name'],
                        as:'Bodega',
                        
                    }]
                }
            });
            array.push(element);
            datareal.push(Object.assign(borro.rows[i].dataValues, { article_list: array[i].rows }));
        }


        if (borro.count != 0) {
            res.status(200).json(datareal);
        } else {
            res.status(204).send({
                message: 'No hay registros en el sistema.'
            });
        }

    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        });
        next(error);
    }
}

exports.approve = async (req, res, next) => {

    try {
        const { obs } = req.body;
        const { auth_user_fk } = req.body;

        if (auth_user_fk) {
            const aprovar = await db.borrowing.update({ auth_state: 'Aprobada', obs: obs, auth_user_fk: auth_user_fk },
                {
                    where: {
                        id: req.body.borrowing_id
                    },
                });
            res.status(200).send({
                message: 'Constancia de Préstamo Aprobada.'
            });
        } else {
            res.status(204).send({
                message: 'No es posible Aprobar la Constancia de Préstamo.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error en el servidor!'
        });
        next(error);
    }
};


exports.reject = async (req, res, next) => {

    try {
        const { obs } = req.body;
        const { auth_user_fk } = req.body;

        const aprovar = await db.borrowing.update({ auth_state: 'Denegado', obs: obs, auth_user_fk: auth_user_fk },
            {
                where: {
                    id: req.body.borrowing_id
                },
            });
        res.status(200).send({
            message: 'Constancia de Préstamo Rechazada.'
        });

    } catch (error) {
        res.status(500).send({
            message: 'Error en el servidor!'
        });
        next(error);
    }
};
