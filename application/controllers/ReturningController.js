const db = require('../models');
const mailService = require('../services/mail');

exports.create = async (req, res, next) => {
    try {
        const borrowing = await db.borrowing.findOne({ where: { id: req.body.borrowing_fk } });
        if (borrowing.auth_state == 'Aprobada' && borrowing.has_returning == 0) {
            const registro = await db.returning.create({
                auth_state: 'Pendiente',
                state: req.body.state,
                borrowing_fk: borrowing.id,
                auth_user_fk: req.body.auth_user_fk,
                obs: req.body.obs
            });
            if (registro) {
                const update = await db.borrowing.update({ has_returning: 1 },
                    {
                        where: { id: borrowing.id }
                    })
                res.status(200).send({
                    message: 'La solicitud de devolución se ha creado con éxito.'
                });
            }
        }
        else {
            res.status(409).send({
                error:
                    'No es posible realizar una solicitud de devolución a un préstamo que no ha sido aprobado o ya tiene una constancia de devolución.'
            });
        }
    } catch (error) {
        res.status(500).send({
            error: '¡Error en el servidor!'
        });
        next(error);
    }
}

exports.list = async (req, res, next) => {
    try {
        const registro = await db.returning.findAndCountAll({
            include: [{
                model: db.borrowing,
                attributes: ['auth_state', 'pick_up_date', 'return_date'],
                required: true,
                as: 'solicitud',
            }, {
                model: db.user,
                attributes: ['user_name', 'email', 'phone'],
                required: true,
                as: 'evaluador',
            }]
        });

        const array = [];
        var datareal = [];
        for (var i = 0; i < registro.count; i++) {
            var element = await db.reservation.findAndCountAll({
                attributes: ['id', 'borrowing_fk', 'article_fk'],
                where: { borrowing_fk: registro.rows[i].borrowing_fk },
                include: {
                    model: db.article,
                    attributes: ['label', 'id', 'article_type_fk'],
                    as: 'Articulo',
                    include: {
                        model: db.article_type,
                        attributes: ['classif', 'article_type_name'],
                        as: 'Tipo',
                    }
                }
            });
            array.push(element);
            datareal.push(Object.assign(registro.rows[i].dataValues, { article_list: array[i].rows }));
        }
        if (registro.count != 0) {
            res.status(200).json(datareal);
        } else {
            res.status(404).send({
                error: 'No hay registros en el sistema.'
            });
        }
    } catch (error) {
        res.status(500).send({
            error: '¡Error en el servidor!'
        });
        next(error);
    }
}

exports.detail = async (req, res, next) => {
    const { returning_id } = req.query;
    try {

        const retu = await db.returning.findAndCountAll({
            where: { id: returning_id },
            include: [{
                model: db.borrowing,
                attributes: ['auth_state', 'pick_up_date', 'return_date'],
                required: true,
                as: 'solicitud',
            }, {
                model: db.user,
                attributes: ['user_name', 'email', 'phone'],
                required: true,
                as: 'evaluador',
            }]
        });

        const array = [];
        var datareal = [];
        for (var i = 0; i < retu.count; i++) {
            var element = await db.reservation.findAndCountAll({
                attributes: ['id', 'borrowing_fk', 'article_fk'],
                where: { borrowing_fk: retu.rows[i].borrowing_fk },
                include: {
                    model: db.article,
                    attributes: ['label', 'id', 'article_type_fk'],
                    as: 'Articulo',
                    include: [{
                        model: db.article_type,
                        attributes: ['classif', 'article_type_name'],
                        as: 'Tipo',
                    },
                    {
                        model: db.warehouse,
                        attributes: ['warehouse_name'],
                        as: 'Bodega',

                    }]
                }
            });
            array.push(element);
            datareal.push(Object.assign(retu.rows[i].dataValues, { article_list: array[i].rows }));
        }
        if (retu.count != 0) {
            res.status(200).json(datareal);
        } else {
            res.status(404).send({
                error: 'No hay registros en el sistema.'
            });
        }

    } catch (error) {
        res.status(500).send({
            error: '¡Error en el servidor!'
        });
        next(error);
    }
}

exports.approve = async (req, res, next) => {
    try {
        const registro = await db.returning.update({ auth_state: 'Aprobado' },
            {
                where: {
                    id: req.body.returning_id,
                },
            });
        
        //permite cambiar el estado de los articulos del prestamo a disponible.
        if (registro == 1) {
            const solicitud = await db.returning.findOne({
                where: { id: req.body.returning_id }
            });
            const prestamo = await db.borrowing.findOne({
                where: { id: solicitud.borrowing_fk }
            });
            const element = await db.reservation.findAndCountAll({
                where: { borrowing_fk: prestamo.id }
            });
            for (var i = 0; i < element.count; i++) {
                const data = await db.article.update({ available_state: 'Disponible' },
                    {
                        where: { id: element.rows[i].article_fk }
                    });
            }

            //envia el correo electronico al usuario -> Solicitud aprobada.
            const user = await db.user.findOne({where:{id : prestamo.user_fk}});
            const type_request = "returning";
            const action_type = 'auth';
            const auth = true;
            mailService.enviar(user, type_request, action_type, solicitud.id,auth);

            res.status(200).json({
                message: 'Constancia de devolución aprobada.'
            });
        }

      
    } catch (error) {
        res.status(500).send({
            error: '¡Error en el servidor!'
        });
        next(error);
    }
};

exports.reject = async (req, res, next) => {
    try {
        const registro = await db.returning.update({ auth_state: 'Denegado' },
            {
                where: {
                    id: req.body.returning_id
                },
            });

            const solicitud = await db.returning.findOne({
                where: { id: req.body.returning_id }
            });
            const prestamo = await db.borrowing.findOne({
                where: { id: solicitud.borrowing_fk }
            });
            const user = await db.user.findOne({where:{id : prestamo.user_fk}});

            const type_request = "returning";
            const action_type = 'auth';
            const auth = false;
            mailService.enviar(user, type_request, action_type, solicitud.id,auth);

        res.status(200).send({
            message: 'Constancia de devolución denegada.'
        });
    } catch (error) {
        res.status(500).send({
            error: '¡Error en el servidor!'
        });
        next(error);
    }
};
