const router = require('express').Router();
const ReturningController = require('../../controllers/ReturningController');

router.post('/create',ReturningController.create);

router.get('/list', ReturningController.list);

router.put('/approved', ReturningController.approve);
router.put('/rejected', ReturningController.reject);

module.exports = router;