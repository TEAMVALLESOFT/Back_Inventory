const router = require('express').Router();
const ArticleController = require('../../controllers/ArticleController');

router.post('/create', ArticleController.create);


module.exports = router;