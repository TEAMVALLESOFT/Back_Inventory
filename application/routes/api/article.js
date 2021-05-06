const router = require('express').Router();
const ArticleController = require('../../controllers/ArticleController');
const auth = require('../../middleware/auth');

router.post('/create',auth.verifyWarehouseManager, ArticleController.create);
router.get('/list', ArticleController.list);


module.exports = router;