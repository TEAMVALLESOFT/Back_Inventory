const router = require('express').Router();
const TypeController = require('../../controllers/TypeController');

router.post('/create', TypeController.add);
router.get('/list',TypeController.list);


module.exports = router;