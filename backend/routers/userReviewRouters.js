const express = require('express');
const router = express.Router();
const userReviewController = require('../controllers/userReviewController');


router.get('/', userReviewController);


module.exports = router;