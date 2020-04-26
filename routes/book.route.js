const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller'); 
const adminMiddleware = require('../middleware/admin.middleware');

router.get('/', bookController.getBooks);
router.get('/create', adminMiddleware, bookController.getCreateBook);
router.get('/update/:id', adminMiddleware, bookController.getUpdateBook);
router.get('/delete/:id', adminMiddleware, bookController.deleteBook);

router.post('/update', adminMiddleware, bookController.postUpdateBook);
router.post('/create', adminMiddleware, bookController.postCreateBook);

module.exports = router;
