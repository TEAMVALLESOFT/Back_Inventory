const bcrypt = require('bcryptjs');
const db = require ('../models');
const tokenServices = require('../services/token');


exports.add = async(req,res,next)=>{
    try{  
        const Usuario = await db.user.findOne({where: {email: req.body.email}});
        if(Usuario){
            res.status(409).send({
                message: 'El correo electrónico ya se encuentra en uso.'
            })
        }
        else{
            req.body.password =  bcrypt.hashSync(req.body.password,10);
            const Usuario = await  db.user.create(req.body);
            res.status(200).send({
                message: 'Usuario creado con éxito.'
            });
        }
    }catch(error){
        res.status(500).send({
            message: '¡Error en el servidor!.'
        })
        next(error);
    }
};

exports.login = async(req,res,next)=>{
    try{
        const Usuario = await  db.user.findOne({where: {email: req.body.email}});
        if(Usuario){
            const passwordIsValid = bcrypt.compareSync(req.body.password, Usuario.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(Usuario);
                res.status(200).send({
                    message: 'Bienvenido',
                    token : token,
                    user :
                    {   
                        id : Usuario.user_id,
                        name: Usuario.user_name,
                        email: Usuario.email
                    }             
                })

            }else {           
                //error en la autenticación
                res.status(401).json({
                    error: 'Error en el ususario o contraseña'
                })
            }
        }else{
            //error en la autenticación
            res.status(404).json({
                error: 'Error en el ususario o contraseña'
            })
        }
    }catch(error){
        res.status(500).send({
            message: '¡Error en el servidor!.'
        })
        next(error);
    }
};
