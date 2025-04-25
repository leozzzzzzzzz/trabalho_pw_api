const { Router } = require('express');

const {getTipos, addTipo, updateTipo, deleteTipo, getTipoByCodigo} = require('../controllers/tipoController');

const routesTipo = new Router();


routesTipo.route('/tipo')
    .get(getTipos)
    .post(addTipo)
routesTipo.route('/tipo/:id') 
    .get(getTipoByCodigo)
    .put(updateTipo)
    .delete(deleteTipo)

module.exports = { routesTipo };
