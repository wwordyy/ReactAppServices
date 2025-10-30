const express = require('express');
const router = express.Router();
const userOrderDataController = require('../controllers/userOrderDataController');


router.get('/users/:userID/orders', userOrderDataController.getUserOrderData);


module.exports = router;