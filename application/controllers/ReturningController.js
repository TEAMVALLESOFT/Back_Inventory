const db = require('../models');

exports.create = async (req, res, next) => {
    try {
        const borrowing = await db.borrowing.findOne({ where: { id: req.body.borrowing_fk } });
        if (borrowing.auth_state == 'Aprobada') {
            const registro = await db.returning.create({
                auth_state: 'Pendiente',
                state: req.body.state,
                borrowing_fk : borrowing.id,
                auth_user_fk: req.body.auth_user_fk  
            });
            if(registro){
                res.status(200).send({
                    message: 'La solicitud de devolución se ha creado con éxito.'
                });
            }
        }
        else{
            res.status(409).send({
                message: 'No es posible realizar una solicitud de devolución a un préstamo que no ha sido Aprobado.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor.!'
        });
        next(error);
    }
}

