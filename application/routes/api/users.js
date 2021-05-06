const router = require('express').Router();
const UserController = require('../../controllers/UserController');
const auth = require('../../middleware/auth');

router.post('/create',auth.verifyAdmin, UserController.add);
router.post('/login', UserController.login);

router.put('/update', UserController.update);

router.get('/list', auth.verifyAdmin, UserController.list);
router.get('/detail', UserController.detail);

module.exports = router;