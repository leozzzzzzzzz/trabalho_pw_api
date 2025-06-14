const { pool } = require('../config')
const Usuario = require('../entities/usuario')

const autenticaUsuarioDB = async (body) => {
    try {           
        const { email, senha } = body
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1 AND senha = $2`,
        [email, senha]);
        
        if (results.rowCount == 0) {
            throw "Usuário ou tenha inválidos";
        }
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.cpf, usuario.telefone, usuario.nome, usuario.tipo);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, cpf, telefone, nome, tipo, senha } = body;
        const result = await pool.query(
            "INSERT INTO usuarios (email, cpf, telefone, nome, tipo, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [email, cpf, telefone, nome, tipo, senha]
        );
        const usuario = result.rows[0];
        return new Usuario(
            usuario.email,
            usuario.cpf,
            usuario.telefone,
            usuario.nome,
            usuario.tipo
        );
    } catch (err) {
        throw "Erro ao tentar cadastrar o usuário: " + err;
    }
}

const updateUsuarioDB = async (cpf, body) => {
    try {
        const { email, telefone, nome, tipo } = body;
        const result = await pool.query(
            "UPDATE usuarios SET email = $1, telefone = $2, nome = $3, tipo = $4 WHERE cpf = $5 RETURNING *",
            [email, telefone, nome, tipo, cpf]
        );

        if (result.rowCount === 0) {
            throw "Erro: usuário não encontrado";
        }

        const usuario = result.rows[0];
        return new Usuario(
            usuario.email,
            usuario.cpf,
            usuario.telefone,
            usuario.nome,
            usuario.tipo
        );
    } catch (error) {
        throw "Erro: " + error;
    }
}

const getUsuarioDB = async (cpf) => {
    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE cpf = $1",
            [cpf]
        );
        if (result.rowCount === 0) {
            throw "Usuário não encontrado";
        }
        const usuario = result.rows[0];
        return new Usuario(
            usuario.email,
            usuario.cpf,
            usuario.telefone,
            usuario.nome,
            usuario.tipo
        );
    } catch (err) {
        throw "Erro ao tentar obter o usuário: " + err;
    }
}

module.exports = {
    autenticaUsuarioDB, cadastraUsuarioDB, updateUsuarioDB, getUsuarioDB
}