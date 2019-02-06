/*
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const db = require('./../../postgres.js');
const config = require('./../../config');
const userConn = db.userConn;
const loginConn = db.loginConn;

newUser = (req, res) => {
  const query = {
    "text": "SELECT company_id, customerid, empid, status, email, company_name, lname, fname, password, admin, industry, maintcode FROM login WHERE email = $1 ",
    "values" : [req.body.email]
  };
  auth.query(query)
    .then(data => res.status(200).json({ message: data.rows }))
    .catch(e => console.error(e.stack))
}

addUser = (req, res) => {
  const query = {
    "text": "SELECT company_id, customerid, empid, status, email, company_name, lname, fname, password, admin, industry, maintcode FROM login WHERE email = $1 ",
    "values" : [req.body.email]
  };
  auth.query(query)
    .then(data => res.status(200).json({ message: data.rows }))
    .catch(e => console.error(e.stack))
}

setToken = (req,res,userData) => {
    var token = jwt.sign({ userEmail: userData.email, companyId: userData.company_id }, config.APIcode);
    delete userData.password;//ensure the pw hash isn't sent along to the client
    res.status(200).json({ token: token, success: true, userData: userData });
}

logout = (req, res) => {

}

module.exports =  { setToken, logout, newUser, addUser}
*/