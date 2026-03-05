const flash = require('connect-flash');
const User = require('../models/user');
const ExpressError = require('../utils/errors');

// GET /user/signup - Show registration form
async function showRegisterForm(req, res) {
    return res.render('user/signup');
}
// POST /user/signup - Handle user registration
async function registerUser(req, res) {
    try{
    const { username, password ,email} = req.body.user;
    const newUser=new User({
        username,
        email
    });
    const registeredUser= await User.register(newUser, password);
    req.login(registeredUser, (err)=>{
        if(err)
            throw new ExpressError(err, 500)
        req.flash('success', 'Registration successful! Welcome to Stay Trail');

    })
    return res.status(301).redirect('/user/login');
    }catch(e){
        req.flash('error', e.message);
        return res.redirect('/user/signup');
    }
}
//GET /user/login - Show login form
async function showLoginForm(req, res) {
    return res.render('user/login');
}
// POST /user/login - Handle user login
async function loginUser(req, res) {
    req.flash('success', 'Welcome back!');
    return res.redirect(res.locals.redirectUrl);
}
//GET /user/logout - Handle user logout
async function logoutUser(req, res) {
    req.logout((err)=>{
        if(err)
            throw new ExpressError(err, 500)
        req.flash('success', 'Logout succesfull');
    })
    return res.redirect("/listings");
}

module.exports = {
    showRegisterForm,
    registerUser,
    showLoginForm,
    loginUser,
    logoutUser
}
