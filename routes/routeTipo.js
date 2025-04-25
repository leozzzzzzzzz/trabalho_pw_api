const { Router } = require('express');

//const {} = require('../controllers/tipoController');

const routesTipo = new Router();

/*
routesTipo.route('/tipo')
    .get(getTipos)
    .post(addTipo)
routesTipo.route('/tipo/:id') 
    .get(getTipoPorCodigo)
    .put(updateTipo)
    .delete(deleteTipo)
*/
module.exports = { routesTipo };
