const router = require('express').Router();
const ArticleController = require('../../controllers/ArticleController');
const auth = require('../../middleware/auth');

router.post('/create',auth.verifyWarehouseManager, ArticleController.create);

router.put('/update', auth.verifyWarehouseManager,ArticleController.update);

router.get('/list', auth.verifyBranchChief,ArticleController.list);
router.get('/makefile', auth.verifyBranchChief, ArticleController.makefile);


module.exports = router;