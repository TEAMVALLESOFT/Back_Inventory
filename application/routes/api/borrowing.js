const router = require('express').Router();
const BorrowingController = require('../../controllers/BorrowingController');

router.post('/create',BorrowingController.add);

module.exports = router;