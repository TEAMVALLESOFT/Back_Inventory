const {Warehouse} = require('../Config/db');
const {User} = require('../Config/db');


exports.create = async(req,res,next)=>{
    try {
        const Usuario = await User.findOne({where: {email: req.body.email}});
        if(Usuario){
            const id = Usuario.user_id;
            const registro = await Warehouse.create({warehouse_name: req.body.warehouse_name,
                desc: req.body.desc, address: req.body.address, user_fk: id});
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
            message: 'Error'
        });
        next(error);
    }
};


exports.list = async(req, res, next)=>{
    try {
        const bodegas = await Warehouse.findAll();
        if(bodegas){
            res.status(200).json(bodegas);
        }else{
            res.status(404).send({
                message: 'No hay bodegas en el sistema.'
            });
        }    
    } catch (error) {
        res.status(500).send({
            message: 'Error!!'
        });
        next(error);    
    }
};