const router = require('express').Router();
const ArticleController = require('../../controllers/ArticleController');

router.post('/create', ArticleController.create);
router.get('/list', ArticleController.list);


module.exports = router;