const { Router } = require('express');

const { getLocais, addLocal, updateLocal, deleteLocal, getLocalByCodigo} = require('../controllers/localController');

const routesLocal = new Router();

routesLocal.route('/local')
    .get(getLocais)
    .post(addLocal)

routesLocal.route('/local/:codigo')
    .get(getLocalByCodigo)
    .put(updateLocal)
    .delete(deleteLocal)

module.exports ={ routesLocal };