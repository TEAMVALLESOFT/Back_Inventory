const router = require('express').Router();
const UsersRouter = require('./api/users');
const WarehouseRouter = require('./api/warehouse');

router.use('/user', UsersRouter);
router.use('/warehouse', WarehouseRouter);

module.exports = router;