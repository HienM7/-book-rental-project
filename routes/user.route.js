const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); 
const adminMiddleware = require('../middleware/admin.middleware');
const userMiddleware = require("../middleware/user.middleware");
const paginationMiddleware = require('../middleware/pagination.middleware');

router.get('/', paginationMiddleware, adminMiddleware, userController.getUsers);
router.get('/create', adminMiddleware, userController.getCreateUser);
router.get('/update/:id', adminMiddleware, userController.getUpdateUser);
router.get('/delete/:id', adminMiddleware, userController.deleteUser);

router.post('/update', adminMiddleware, userController.postUpdateUser);
router.post('/create', adminMiddleware, userMiddleware, userController.postCreateUser);

module.exports = router;
