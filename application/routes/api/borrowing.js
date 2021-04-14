const router = require('express').Router();
const BorrowingController = require('../../controllers/BorrowingController');

router.post('/create',BorrowingController.create);

router.get('/list',BorrowingController.list);
router.get('/id',BorrowingController.detail);

router.put('/approved',BorrowingController.approve);
router.put('/rejected',BorrowingController.reject);

module.exports = router;