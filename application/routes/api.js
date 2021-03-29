const router = require('express').Router();
const UsersRouter = require('./api/users');
const WarehouseRouter = require('./api/warehouse');
const TypeRouter = require('./api/type')


router.use('/user', UsersRouter);
router.use('/warehouse', WarehouseRouter);
router.use('/article_type',TypeRouter);

module.exports = router;