const {  Router } = require('express'); 

//const {} = require('../controllers/passagemController');

const routesPassagem = new Router();

/*      
routesPassagem.route('/passagem')
    .get(getPassagens)
    .post(addPassagem)

routesPassagem.route('/passagem/:id')
    .get(getPassagemPorCodigo)
    .put(updatePassagem)
    .delete(deletePassagem) 

*/

module.exports = { routesPassagem };