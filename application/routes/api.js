const router = require('express').Router();
const UsersRouter = require('./api/users');

router.use('/user', UsersRouter);

module.exports = router;