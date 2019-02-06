
const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  console.log('auth')
    const authorized = 'authorized';
    const cookieName = process.env.COOKIE_NAME;
    if (req.cookies[cookieName] && req.headers.csrf) {//check if cookie and token exist
      const cookie = req.cookies[cookieName];
      const csrf = req.headers.csrf;
      //if cookie and token exist and the token is valid, check that they are the same
      if (cookie.token === csrf) {
        var verifiedToken;
        try {
          verifiedToken = jwt.verify(csrf, process.env.JWT_SECRET);
        } catch (error) {
          res.header(authorized, false);
          res.header('token', null);
          res.clearCookie(cookieName);
          next();
        }
        //upon authentication, renew the token and the cookie
        var token = jwt.sign({ userData: verifiedToken }, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.cookie(process.env.COOKIE_NAME, {token: token}, 
          {expires: new Date(Date.now() + (60*60*1000)), 
            maxAge: (60*60*1000), 
            httpOnly: true,
            secure: process.env.NODE_ENV});
        res.header(authorized, true);
        res.header('token', token)
        next();
      } else {
        res.header(authorized, false);
        res.header('token', null);
        next();
      }
      
    } else {
      res.header(authorized, false);
      res.header('token', null);
      next();
    }
  }

  module.exports = Auth;