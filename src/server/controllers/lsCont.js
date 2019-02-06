const routes = require('express').Router();
const liveSearch = require('./../model/liveSearch');
const autoFill = require('./../model/autoFill');
const search = liveSearch.search;
const fill = autoFill.fill;

routes.get('/LiveSearch/:name.:value', search);
routes.get('/autofill/:name/:value', fill);

module.exports = routes;