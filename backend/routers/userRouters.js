
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getAllUsers);
router.get('/users/:userID', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userID', userController.putUser);
router.delete('/users/:userID', userController.deleteUser);


module.exports = router;