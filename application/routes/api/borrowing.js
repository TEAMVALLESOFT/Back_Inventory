const router = require('express').Router();
const BorrowingController = require('../../controllers/BorrowingController');

router.post('/create',BorrowingController.create);

module.exports = router;