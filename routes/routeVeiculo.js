const { Router } = require('express');

const { getVeiculoById, getVeiculos, addVeiculo, updateVeiculo, deleteVeiculo } = require('../controllers/veiculoController');

const routesVeiculo = new Router();


routesVeiculo.route('/veiculo')
    .get(getVeiculos)
    .post(addVeiculo)

routesVeiculo.route('/veiculo/:id')
    .get(getVeiculoById)
    .put(updateVeiculo)
    .delete(deleteVeiculo)

    module.exports = { routesVeiculo }; 