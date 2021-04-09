const router = require('express').Router();
const UsersRouter = require('./api/users');
const WarehouseRouter = require('./api/warehouse');
const TypeRouter = require('./api/type');
const ArticleRouter = require('./api/article');


router.use('/user', UsersRouter);
router.use('/warehouse', WarehouseRouter);
router.use('/article_type',TypeRouter);
router.use('/article', ArticleRouter);
router.use('/borrowing',BorrowingRouter);

module.exports = router;
