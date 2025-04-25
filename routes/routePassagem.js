const {  Router } = require('express'); 

const { getPassagemById, getPassagens, addPassagem, updatePassagem, deletePassagem } = require('../controllers/passagemController');

const routesPassagem = new Router();


routesPassagem.route('/passagem')
    .get(getPassagens)
    .post(addPassagem)

routesPassagem.route('/passagem/:id')
    .get(getPassagemById)
    .put(updatePassagem)
    .delete(deletePassagem) 



module.exports = { routesPassagem };