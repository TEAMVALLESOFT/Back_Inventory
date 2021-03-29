const router = require('express').Router();
const WarehouseController = require('../../controllers/WarehouseController');

router.post('/create', WarehouseController.create);
router.get('/list', WarehouseController.list);

module.exports = router;