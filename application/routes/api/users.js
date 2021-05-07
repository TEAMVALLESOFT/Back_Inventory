const router = require('express').Router();
const UserController = require('../../controllers/UserController');
const auth = require('../../middleware/auth');

router.post('/create',auth.verifyAdmin, UserController.add);
router.post('/login', UserController.login);

router.put('/update', UserController.update);

router.get('/list', auth.verifyAdmin, UserController.list);
router.get('/detail', UserController.detail);

router.put('/recover_pass', UserController.recoverp);
router.post('/token_verification', UserController.tokenv);
router.put('/password_change', UserController.passwd);

module.exports = router;