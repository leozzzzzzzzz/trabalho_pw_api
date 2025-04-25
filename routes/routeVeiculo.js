const { Router } = require('express');

//const {} = require('../controllers/veiculoController');

const routesVeiculo = new Router();

/*
routesVeiculo.route('/veiculo')
    .get(getVeiculos)
    .post(addVeiculo)

routesVeiculo.route('/veiculo/:id')
    .get(getVeiculoPorCodigo)
    .put(updateVeiculo)
    .delete(deleteVeiculo)
*/
module.exports = { routesVeiculo }; 