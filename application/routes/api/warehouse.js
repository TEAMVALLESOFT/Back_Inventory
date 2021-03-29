const router = require('express').Router();
const WarehouseController = require('../../controllers/WarehouseController');

router.post('/create', WarehouseController.create);

module.exports = router;