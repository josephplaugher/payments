const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('./../model/users/login');
const newAccount = require('./../model/users/newUser');
const login = user.login;
const logout = user.logout;
const newUser = newAccount.newUser;
const addUser = newAccount.newUser;

//routes.post('/users/login', login);
routes.get('/users/checkLoginState/:token', (req, res) => {
    console.log('cookie: ', req.cookies)
    jwt.verify(req.params.token, 'shhhhh', (er, decoded) => {
        if(er) { 
            res.status(200).json({ isLoggedIn: false});
        }else{
            res.status(200).json({ userData: decoded.userData});
        }
    });
});
/*
routes.post('/user/logout', logout);
routes.post('/user/newUser', newUser);
routes.post('/user/addUser', addUser);
*/
module.exports = routes;
