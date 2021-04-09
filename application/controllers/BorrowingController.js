const db = require('../models');

exports.add = async (req, res, next) => {
    try {
        const User = await db.user.findOne({ where: { id: req.body.user_id } });
        if (User != null) {
            const array = req.body.article_list;
            console.log(array.length)
            if (array != null) {

                const registro = await db.borrowing.create({
                    user_fk: req.body.user_id,
                    creation_date: req.body.creation_date,
                    auth_state: req.body.auth_state,
                    pick_up_date: req.body.pick_up_date,
                    return_date: req.body.return_date,
                });
               
                const borrowingId = await db.borrowing.findOne({ where: { id: registro.id } })
                if (borrowingId != null) {

                    console.log("a")
                    for (var i = 0; i < array.length; i++) {
                        console.log("b")
                        const registroR = await db.reservation.create({
                            article_fk: array[i].article_id,
                            borrowing_fk: borrowingId.id,
                        });
                    }
                }

                res.status(200).send({
                    message: 'El Prestamo fue creado con éxito.'
                });

            }
            else {
                res.status(404).send({
                    message: 'No seleccionaste ningun articulo'
                })
            }
        }
        else {
            res.status(404).send({
                message: 'No se encontro el Usuario.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor.!'
        });
        next(error);
    }
};