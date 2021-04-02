const db = require ('../models');

exports.create = async(req,res,next)=>{
    try {
        const Usuario = await db.user.findOne({where: {email: req.body.email}});
        if(Usuario){
            const registro = await db.warehouse.create({warehouse_name: req.body.warehouse_name,
                desc: req.body.desc, address: req.body.address, user_fk: Usuario.id});
                res.status(200).send({
                    message: 'Bodega creada con exito.'
                });       
        }else{
            res.status(404).send({
                message: 'Es necesario que ingrese el email registrado de la persona a cargo de la bodega.'
            });
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        });
        next(error);
    }
};


exports.list = async(req, res, next)=>{
    try {
        const bodegas = await db.warehouse.findAll({
            include: {
                model : db.user,
                attributes: ['user_name', 'email', 'phone'],
                required: true,
                as: 'encargado',  
            }
        });
        if(bodegas){
            res.status(200).json(bodegas);
        }else{
            res.status(204).send({
                message: 'No hay bodegas en el sistema.'
            });
        }    
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        });
        next(error);    
    }
};
