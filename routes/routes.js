const { Router } = require('express');

const { routesTipo } = require('./routeTipo'); 
const { routesLocal } = require('./routeLocal');
const { routesVeiculo } = require('./routeVeiculo');
const { routesPassagem } = require('./routePassagem');

const routes = new Router();

routes.use(routesTipo);
routes.use(routesLocal);
routes.use(routesVeiculo);
routes.use(routesPassagem);

module.exports = { routes };