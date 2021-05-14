const router = require('express').Router();
const ReturningController = require('../../controllers/ReturningController');
const auth = require('../../middleware/auth');

router.post('/create',ReturningController.create);

router.get('/list', ReturningController.list);
router.get('/id', ReturningController.detail);

router.put('/approved', auth.verifyWarehouseManager,ReturningController.approve);
router.put('/rejected', auth.verifyWarehouseManager, ReturningController.reject);

router.put('/update', ReturningController.update);

module.exports = router;