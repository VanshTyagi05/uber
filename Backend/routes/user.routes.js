const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const { body } = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware.js');
router.post('/register', [
  body('email').isEmail().withMessage('Invalid email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is required'),
  body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
userController.registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getProfile);

module.exports = router;
 