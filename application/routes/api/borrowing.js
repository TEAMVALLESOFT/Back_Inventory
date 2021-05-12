const router = require('express').Router();
const BorrowingController = require('../../controllers/BorrowingController');
const auth = require('../../middleware/auth');

router.post('/create',BorrowingController.create);

router.get('/list',BorrowingController.list);
router.get('/id',BorrowingController.detail);

router.put('/approved', auth.verifyWarehouseManager,BorrowingController.approve);
router.put('/rejected',auth.verifyWarehouseManager,BorrowingController.reject);

router.put('/update',BorrowingController.update);

module.exports = router;