const tokenServices = require('../services/token');

module.exports = {
    verifyAdmin: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }
        else {
            const validateResponse = await tokenServices.decode(req.headers.token);
            if (validateResponse.rol === 'administrador') {
                next();
            } else {
                return res.status(403).send({
                    message: 'Usuario no autorizado'
                });
            }
        }
    },
    verifyWarehouseManager: async (req, res, next) => {
        if (!req.headers.token) {
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }
        else {
            const validateResponse = await tokenServices.decode(req.headers.token);
            if (validateResponse.rol === 'jefe de bodega' || validateResponse.rol === 'administrador') {
                next();
            } else {
                return res.status(403).send({
                    message: 'Usuario no autorizado.'
                });
            }
        }

    },
}