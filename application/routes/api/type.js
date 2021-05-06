const router = require('express').Router();
const TypeController = require('../../controllers/TypeController');
const auth = require('../../middleware/auth');

router.post('/create', auth.verifyWarehouseManager, TypeController.add);

router.get('/list',TypeController.list);


module.exports = router;