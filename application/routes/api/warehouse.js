const router = require('express').Router();
const WarehouseController = require('../../controllers/WarehouseController');
const auth = require('../../middleware/auth');

router.post('/create', auth.verifyAdmin, WarehouseController.create);
router.get('/list', WarehouseController.list);

module.exports = router;