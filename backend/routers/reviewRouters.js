const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');


router.get('/reviews', reviewController.getAllReview);
router.post('/reviews', reviewController.createReview);
router.put('/reviews/:id', reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);



module.exports = router;