const { Router } = require('express');

//const {} = require('../controllers/localController');

const routesLocal = new Router();

/*
routesLocal.route('/local')
    .get(getLocais)
    .post(addLocal)

routesLocal.route('/local/:id')
    .get(getLocalPorCodigo)
    .put(updateLocal)
    .delete(deleteLocal)
*/

module.exports ={ routesLocal };