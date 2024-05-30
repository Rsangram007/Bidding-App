const Router = require('express').Router();
const { register, login ,getUserProfile} = require('../Controller/UserController');
const {validateToken} = require("../Middleware/auth")


Router.post('/register', register);
Router.post('/login', login);
Router.get('/profile', validateToken, getUserProfile);
module.exports = Router;