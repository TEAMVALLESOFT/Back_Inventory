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

exports.list = async (req,res,next)=>{
    try {
        const registro = await db.returning.findAndCountAll({
            include: [{
                model : db.borrowing,
                attributes: [ 'auth_state','pick_up_date','return_date'],
                required: true,
                as: 'solicitud',
            },{                
                model : db.user,
                attributes: ['user_name', 'email', 'phone'],
                required: true,
                as: 'evaluador',  
            }]
        });

        const array = [];
        var datareal = [];
        for(var i=0; i<registro.count;i++){
            var element = await db.reservation.findAndCountAll({
                attributes: ['id', 'borrowing_fk', 'article_fk'],
                where:{ borrowing_fk: registro.rows[i].borrowing_fk},
                include:{
                    model : db.article,
                    attributes: [ 'label','id','article_type_fk'],
                    as: 'Articulo',
                    include:{
                        model : db.article_type,
                        attributes: [ 'classif','article_type_name'],
                        as: 'Tipo',
                    }
                }
            });
            array.push(element);      
            datareal.push(Object.assign(registro.rows[i].dataValues, {article_list:array[i].rows}));   
        }
        if(registro.count != 0){
            res.status(200).json(datareal);
        }else{
            res.status(404).send({
                message: 'No hay constancias de devolución en el sistema.'
            });
        }            
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        });
        next(error); 
    }
}

exports.approve = async(req, res, next) =>{
    try {
        const registro = await db.returning.update({auth_state: 'Aprobado'},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).send({
                message: 'Constancia de devolución Aprobada.'
            });
    } catch (error) {
        res.status(500).send({
            message: '¿Error en el servidor!.'
        });
        next(error);
    }
};

exports.reject = async(req, res, next) =>{
    try {
        const registro = await db.returning.update({auth_state: 'Denegado'},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(404).send({
                message: 'Constancia de devolución Denegada.'
            });
    } catch (error) {
        res.status(500).send({
            message: ']¡Error en el servidor!.'
        });
        next(error);
    }
};
