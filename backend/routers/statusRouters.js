const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');


router.get('/statuses', statusController.getAllStatuses);
router.post('/statuses', statusController.createStatus);
router.put('/statuses/:id', statusController.updateStatus);
router.delete('/statuses/:id', statusController.deleteStatus);

module.exports = router;