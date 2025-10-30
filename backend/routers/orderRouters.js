const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


router.get('/orders/:orderID/user', orderController.getUserIdByOrderId);
router.put('/orders', orderController.putOrder);
router.post('/orders', orderController.createOrder);


router.put('/admin/orders/:orderID', orderController.updateAdminOrder);
router.post('/admin/orders', orderController.createAdminOrder);
router.delete('/admin/orders/:orderID', orderController.deleteAdminOrder);



module.exports = router;