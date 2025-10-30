
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');


router.get('/services', serviceController.getAllServices);
router.post('/services', serviceController.createService);
router.put('/services/:id', serviceController.updateService);
router.delete('/services/:id', serviceController.deleteService);

module.exports = router;