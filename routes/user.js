const express = require('express');
const router = express.Router();
const asyncWrap = require('../utils/asyncWrap');
const { showRegisterForm, registerUser, showLoginForm, loginUser } = require('../controlers/user');
const { validateSignup } = require('../middlewares/userValidate');
const passport = require('passport');

// GET /user/signup - Show registration form
router.get('/signup', asyncWrap(showRegisterForm));
// POST /user/signup - Handle user registration
router.post('/signup', validateSignup, asyncWrap(registerUser));
// GET /user/login - Show login form
router.get('/login', asyncWrap(showLoginForm));
// POST /user/login - Handle user login
router.post('/login', 
    passport.authenticate('local',{ failureRedirect: '/user/login' , failureFlash: true}), 
    asyncWrap(loginUser)
);

module.exports=router;