const { pool } = require('../config');

const Tipo = require('../entities/tipo');

const getTiposDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM tipos ORDER BY codigo');
        return rows.map((tipo) => new Tipo(tipo.codigo, tipo.nome, tipo.tarifa));
    } catch (error) {
        throw "Erro: " + error;
    }
}

const addTipoDB = async (body) => {
    try {
        const { nome, tarifa } = body;
        const result = await pool.query(
            'INSERT INTO tipos (nome, tarifa) VALUES ($1, $2) RETURNING *', 
            [nome, tarifa]
        )
        const tipo = result.rows[0];
        return new Tipo(tipo.codigo, tipo.nome, tipo.tarifa);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}

const updateTipoDB = async (body) => {
    try {
        const { codigo, nome, tarifa } = body;
        const result = await pool.query(
            'UPDATE tipos SET nome = $1, tarifa = $2 WHERE codigo = $3 RETURNING *', 
            [nome, tarifa, codigo]
        )

        if (result.rowCount === 0) {
            throw "Erro: Tipo não encontrado";
        }

        const tipo = result.rows[0];
        return new Tipo(tipo.codigo, tipo.nome, tipo.tarifa);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}

const deleteTipoDB = async (codigo) => {
    try {
        const result = await pool.query(
            'DELETE FROM tipos WHERE codigo = $1 RETURNING *', 
            [codigo]
        )

        if (result.rowCount === 0) {
            throw "Erro: Tipo não encontrado";
        }

        const tipo = result.rows[0];
        return new Tipo(tipo.codigo, tipo.nome, tipo.tarifa);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}

const getTipoByCodigoDB = async (codigo) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tipos WHERE codigo = $1', 
            [codigo]
        )

        if (result.rowCount === 0) {
            throw "Erro: Tipo não encontrado";
        }

        const tipo = result.rows[0];
        return new Tipo(tipo.codigo, tipo.nome, tipo.tarifa);
        
    } catch (error) {
        throw "Erro: " + error;
    }   
}
module.exports = {
    getTiposDB,
    addTipoDB,
    updateTipoDB,
    deleteTipoDB,
    getTipoByCodigoDB
}