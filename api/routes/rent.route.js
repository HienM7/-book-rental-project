const express = require('express');
const router = express.Router();

const rentController = require('../controllers/rent.controller');

router.post('/add/:id', rentController.addToRent);
router.get('/', rentController.listRent);
router.post('/submit',rentController.submitRent);


module.exports = router; 