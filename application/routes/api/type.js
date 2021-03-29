const router = require('express').Router();
const TypeController = require('../../controllers/TypeController');

router.post('/create', TypeController.add);


module.exports = router;