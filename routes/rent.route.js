const express = require('express');
const router = express.Router();

const rentController = require('../controllers/rent.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/add/:id', rentController.addToRent);
router.get('/', rentController.listRent);
router.get('/submit', authMiddleware, rentController.submitRent);


module.exports = router; 