const router = require('express').Router();
const ReturningController = require('../../controllers/ReturningController');

router.post('/create',ReturningController.create);

module.exports = router;