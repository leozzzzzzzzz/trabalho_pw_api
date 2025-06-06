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
        return new Usuario(usuario.email, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }    
}

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, cpf, telefone, nome, tipo } = body
        const result = await pool.query(
            "INSERT INTO usuarios (email, cpf, telefone, nome, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [email, cpf, telefone, nome, tipo]
        );
    } catch (err) {
        throw "Erro ao tentar cadastrar o usuário: " + err;
    }
}

const updateUsuarioDB = async (body) => {
    try {
        const { email, cpf, telefone, nome, tipo } = body;
        const result = await pool.query(
            "UPDATE usuarios SET email = $1, cpf = $2, telefone = $3, nome = $4, tipo = $5 WHERE email = $1 RETURNING *",
            [email, cpf, telefone, nome, tipo]
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

const getUsuarioDB = async (body) => {
    //logica para obter os dados
}

module.exports = {
    autenticaUsuarioDB, cadastraUsuarioDB, updateUsuarioDB, getUsuarioDB
}