const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const adminMiddleware = require('../middleware/admin.middleware');
const paginationMiddleware = require('../middleware/pagination.middleware');

router.get('/',adminMiddleware, paginationMiddleware, transactionController.getTransactions);
router.get('/create', adminMiddleware, transactionController.getCreateTransaction);
router.get('/:id/complete', adminMiddleware, transactionController.getComplete);

router.post('/create', adminMiddleware, transactionController.postCreateTransaction);

module.exports = router;
