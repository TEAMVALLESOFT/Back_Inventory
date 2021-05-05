const router = require('express').Router();
const UserController = require('../../controllers/UserController');

router.post('/create', UserController.add);
router.post('/login', UserController.login);
router.get('/list', UserController.list);
router.get('/detail', UserController.detail);

module.exports = router;