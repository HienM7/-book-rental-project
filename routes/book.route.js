const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

const bookController = require('../controllers/book.controller'); 
const adminMiddleware = require('../middleware/admin.middleware');
const sessionMiddleware = require('../middleware/session.middleware');

router.get('/', adminMiddleware, sessionMiddleware, bookController.getBooks);
router.get('/create', adminMiddleware, bookController.getCreateBook);
router.get('/update/:id', adminMiddleware, bookController.getUpdateBook);
router.get('/delete/:id', adminMiddleware, bookController.deleteBook);

router.post('/update', adminMiddleware, upload.single('avatar'), bookController.postUpdateBook);
router.post('/create', adminMiddleware, upload.single('avatar'), bookController.postCreateBook);

module.exports = router;
