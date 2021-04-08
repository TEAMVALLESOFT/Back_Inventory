const router = require('express').Router();
const TypeController = require('../../controllers/TypeController');

router.post('/create', TypeController.add);
router.get('/list',TypeController.list);
router.get('/list/:classif', TypeController.ListbyClassif);


module.exports = router;