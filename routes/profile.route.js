const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const router = express.Router();

const adminMiddleware = require('../middleware/admin.middleware');

const profileController = require('../controllers/profile.controller');

router.get('/:id', adminMiddleware, profileController.getUpdateUser);
router.get('/avatar/:id', adminMiddleware, profileController.getUpdateAvatar);

router.post('/', adminMiddleware, upload.single('avatar'), profileController.postUpdateUser);
router.post('/avatar', adminMiddleware, upload.single('avatar'), profileController.postUpdateAvatar);

module.exports = router;
