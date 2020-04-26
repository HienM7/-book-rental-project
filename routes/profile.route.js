const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const router = express.Router();

const profileController = require('../controllers/profile.controller');

router.get('/:id', profileController.getUpdateUser);
router.get('/avatar/:id', profileController.getUpdateAvatar);

router.post('/', upload.single('avatar'), profileController.postUpdateUser);
router.post('/avatar', upload.single('avatar'), profileController.postUpdateAvatar);

module.exports = router;
