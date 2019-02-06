const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./../../util/postgres');
const loginConn = db.loginConn;

function login(req, res){
  this.req = req;
  this.res = res;
}

login.prototype.getUserData = function() {
  const query = {
    "text": "SELECT company_id, customerid, empid, status, email, company_name, lname, fname, password, admin, industry, maintcode FROM login WHERE email = $1 ",
    "values" : [this.req.body.email.toLowerCase()]
  };
  loginConn.query(query)
    .then(data => this.checkPassword(this.req, this.res,data))
    .catch(e => console.error(e.stack))
}

login.prototype.checkPassword = function(req,res,data) {
  if(data.rows[0]) {
    //if the email resulted in a user entry, compare password hashes
    var dbhash = data.rows[0].password;
    //if the password was hashed in PHP it will contain a '$2y$' hash.
    //if hashed in Node, it will contain a '$2a$a' hash.
    //if the former, we replace it before verifying.
    if(dbhash.includes('$2y$')) { dbhash = dbhash.replace(/^\$2y(.+)$/i, '$2a$1');}
    //compaare the hashes
    bcrypt.compare(req.body.password, dbhash, (error, result) => {
        if(error)
          throw new Error(error);
        else if(result == false) {
          res.status(200).json({ success: false, userNotify: 'That email or password is invalid' });
        } else if(result == true){
          delete data.rows[0].password;//ensure the pw hash isn't sent along to the client
          let userData = {};
          for(prop in data.rows[0]) {
            userData[prop] = data.rows[0][prop];
          }          
          var token = jwt.sign({ userData: userData }, process.env.JWT_SECRET, {expiresIn: "1h"});
          res.cookie(process.env.COOKIE_NAME, {token: token}, 
            {expires: new Date(Date.now() + (60*60*1000)), 
              maxAge: (60*60*1000), 
              httpOnly: true,
              secure: process.env.NODE_ENV === true});
          res.status(200).json({ userNotify: {}, userData: userData, token, token});
        }    
    });
  }else{
    //if no matching entry was found, report an error
    res.status(200).json({ success: false, userNotify: 'That email or password is invalid' });
  }
}

module.exports = login;