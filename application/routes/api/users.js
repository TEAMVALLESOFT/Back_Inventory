const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.post('/create', UserController.add);

module.exports = router;