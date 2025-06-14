const { autenticaUsuarioDB, cadastraUsuarioDB, getUsuarioDB, updateUsuarioDB } = require('../usecases/segurancaUseCases');

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300 //expira em 5 min
            })
            return response.json({ auth: true, token: token })
        })
        .catch(err => response.status(401).json({ auth: false, message: err }));
}

// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['authorization'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
        // Se o token for válido, salva no request para uso posterior
        console.log("Usuario: " + JSON.stringify(decoded.usuario));
        request.usuario = decoded.usuario;
        next();
    });
}

function cadastraUsuario (request, response) {
    cadastraUsuarioDB(request.body)
        .then(usuario => response.status(201).json(usuario))
        .catch(err => response.status(400).json({ message: err }));
}

function getUsuario (request, response) {
    //console.log(request.usuario.cpf)
    if (request.usuario.cpf !== request.params.cpf) {
        return response.status(403).json({ message: "Acesso negado: só é permitido consultar o próprio usuário." });
    }
    getUsuarioDB(request.params.cpf)
        .then(usuario => response.status(200).json(usuario))
        .catch(err => response.status(404).json({ message: err }));
}

function updateUsuario (request, response) {
    //console.log(request.usuario.cpf)
    if (request.usuario.cpf !== request.params.cpf) {
        return response.status(403).json({ message: "Acesso negado: só é permitido consultar o próprio usuário." });
    } 
    updateUsuarioDB(request.params.cpf, request.body)
        .then(usuario => response.status(200).json(usuario))
        .catch(err => response.status(400).json({ message: err }));
}

module.exports = {
    login, verificaJWT, cadastraUsuario, getUsuario, updateUsuario
}