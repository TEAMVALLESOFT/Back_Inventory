const bcrypt = require('bcryptjs');
const db = require('../models');
const tokenServices = require('../services/token');


exports.add = async (req, res, next) => {
    try {
        const Usuario = await db.user.findOne({ where: { email: req.body.email } });
        if (Usuario) {

            res.status(409).send({
                message: 'El correo electrónico ya se encuentra en uso.'
            })
        }
        else {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            if (
                req.body.rol == "jefe de rama" || 
                req.body.rol == "jefe de bodega" || 
                req.body.rol == "admininistrador"
            ) {
                const Usuario = await db.user.create({
                    email: req.body.email,
                    user_name: req.body.user_name,
                    branch: req.body.branch,
                    phone: req.body.phone,
                    password: req.body.password,
                    rol: req.body.rol,
                });

                res.status(200).send({
                    message: 'Usuario creado con éxito.'
                });
            }
            else {

                res.status(409).send({
                    message: 'Rol no permitido'
                })
            }


        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        })
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const Usuario = await db.user.findOne({ where: { email: req.body.email } });
        if (Usuario) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, Usuario.password);
            if (passwordIsValid) {
                const token = await tokenServices.encode(Usuario);
                res.status(200).send({
                    message: 'Bienvenido',
                    token: token,
                    user:
                    {
                        id: Usuario.id,
                        name: Usuario.user_name,
                        email: Usuario.email
                    }
                })

            } else {
                //error en la autenticación
                res.status(401).json({
                    error: 'Error en el ususario o contraseña'
                })
            }
        } else {
            //error en la autenticación
            res.status(404).json({
                error: 'Error en el ususario o contraseña'
            })
        }
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        })
        next(error);
    }
};

exports.list = async (req, res, next) => {

    try {
        const userss = await db.user.findAndCountAll()
        if (userss.count != 0) {
            res.status(200).json(userss);
        } else {
            res.status(204).send({
                message: 'No hay registros en el sistema.'
            });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: '¡Error en el servidor!.' });

    }
};

exports.detail = async (req, res, next) => {
    const { user_id } = req.query;
    try {

        const oneuser = await db.user.findAndCountAll({
            where: { id: user_id },
        });


        if (oneuser.count != 0) {
            res.status(200).json(oneuser);
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

exports.update = async (req, res, next) => {
    try {
        const registro = await db.user.update({
            user_name: req.body.user_name,
            branch: req.body.branch,
            phone: req.body.phone,
            email: req.body.email,
            rol: req.body.rol
        },
            {
                where: {
                    id: req.body.id
                },
            });
            
        res.status(200).send({
            message: 'Usuario modificado con éxito.'
        });
    } catch (error) {
        res.status(500).send({
            message: '¡Error en el servidor!.'
        });
        next(error);
    }
};
