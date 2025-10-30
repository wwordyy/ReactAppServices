const express = require('express');
const router = express.Router();
const orderServiceController = require('../controllers/orderServiceController');


router.get('/orders/:orderID/services', orderServiceController.getServicesFromOrder);
router.post('/orders/:orderID/services/:serviceID', orderServiceController.addServiceToOrder);
router.put('/orders/:orderID/services/:serviceID', orderServiceController.putServicesInOrder);
router.delete('/orders/:orderID/services/:serviceID', orderServiceController.deleteServiceFromOrder);




module.exports = router;