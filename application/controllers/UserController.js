const bcrypt = require('bcryptjs');
const {User} = require('../Config/db');


exports.add = async(req,res,next)=>{
    try{  
        const Usuario = await User.findOne({where: {email: req.body.email}});
        if(Usuario){
            res.status(409).send({
                message: 'El email ya se encuentra en uso.'
            })
        }
        else{
            req.body.password =  bcrypt.hashSync(req.body.password,10);
            const Usuario = await User.create(req.body);
            res.status(200).send({
                message: 'Usuario creado con exito.'
            });
        }
    }catch(error){
        res.status(500).send({
            message: 'Error en el servidor.'
        })
        next(error);
    }
};