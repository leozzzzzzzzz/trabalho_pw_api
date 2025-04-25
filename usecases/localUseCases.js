const { pool } = require('../config');
const Local = require('../entities/local');

const getLocaisDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM locais ORDER BY id');
        return rows.map((local) => new Local(local.codigo, local.nome, local.localizacao));
    } catch (error) {
        throw "Erro: " + error;
    }
}

const addLocalDB = async (body) => {
    try {
        const { nome, localizacao } = body;
        const result = await pool.query(
            'INSERT INTO locais (nome, localizacao) VALUES ($1, $2) RETURNING *', 
            [nome, localizacao]
        )
        const local = result.rows[0];
        return new Local(local.codigo, local.nome, local.localizacao);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}

const updateLocalDB = async (codigo) => {
    try {
        const { codigo, nome, localizacao } = body;
        const result = await pool.query(
            'UPDATE locais SET nome = $1, localizacao = $2 WHERE codigo = $3 RETURNING *', 
            [nome, localizacao, codigo]
        )

        if (result.rowCount === 0) {
            throw "Erro: Local não encontrado";
        }

        const local = result.rows[0];
        return new Local(local.codigo, local.nome, local.localizacao);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}
    
const deleteLocalDB = async (codigo) => {
    try {
        const result = await pool.query(
            'DELETE FROM locais WHERE codigo = $1 RETURNING *', 
            [codigo]
        )

        if (result.rowCount === 0) {
            throw "Erro: Local não encontrado";
        }

        const local = result.rows[0];
        return new Local(local.codigo, local.nome, local.localizacao);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}

const getLocalByCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(
            'SELECT * FROM locais WHERE codigo = $1', 
            [codigo]
        )

        if (results.rowCount === 0) {
            throw "Erro: Local não encontrado";
        } else {
        const local = results.rows[0];
        return new Local(local.codigo, local.nome, local.localizacao);
        }
    } catch (error) {
        throw "Erro: " + error;
    }   
}

module.exports = {
    getLocaisDB,
    addLocalDB,
    updateLocalDB,
    deleteLocalDB,
    getLocalByCodigoDB
}