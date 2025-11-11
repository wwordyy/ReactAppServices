const express = require('express');
const router = express.Router();
const userReviewController = require('../controllers/userReviewController');


router.get('/getAllDataReviews', userReviewController.getAllDataReviews);
router.get('/getReview/:id', userReviewController.getReviewByUserId);


module.exports = router;