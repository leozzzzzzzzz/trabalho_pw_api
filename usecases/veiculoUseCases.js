/*create table veiculos (
    id serial not null primary key, 
    tipo integer not null references tipos (codigo),
    placa varchar (7) not null,
    check (
     placa ~ '^[A-Z]{3}[0-9]{4}$' 
     or 
     placa ~ '^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$'
     ),
    cor varchar (20) not null
 );*/

const { pool } = require('../config')
const Veiculo  = require('../entities/veiculo')

const getVeiculosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM veiculos')
        return rows.map((veiculo) => new Veiculo(veiculo.id, veiculo.tipo, veiculo.placa, veiculo.cor))
    } catch (error) {
        throw "Erro: " + error
    }
}

const addVeiculoDB = async (body) => {
    try {
        const { tipo, placa, cor } = body
        const results = await pool.query(
            'INSERT INTO veiculos (tipo, placa, cor) VALUES ($1, $2, $3) RETURNING *', 
            [tipo, placa, cor]
        )
        const veiculo = results.rows[0]
        return new Veiculo(veiculo.id, veiculo.tipo, veiculo.placa, veiculo.cor)
    } catch (error) {
        throw "Erro: " + error
    }
}

const updateVeiculoDB = async (id, body) => {
    try {
        const { tipo, placa, cor } = body
        const results = await pool.query(
            'UPDATE veiculos SET tipo = $1, placa = $2, cor = $3 WHERE id = $4 RETURNING *', 
            [tipo, placa, cor, id]
        )
        const veiculo = results.rows[0]
        return new Veiculo(veiculo.id, veiculo.tipo, veiculo.placa, veiculo.cor)
    } catch (error) {
        throw "Erro: " + error
    }
}

const deleteVeiculoDB = async (id) => {
    try {
        const results = await pool.query(
            'DELETE FROM veiculos WHERE id = $1 RETURNING *', 
            [id]
        )
        const veiculo = results.rows[0]
        return new Veiculo(veiculo.id, veiculo.tipo, veiculo.placa, veiculo.cor)
    } catch (error) {
        throw "Erro: " + error
    }
}

const getVeiculoByIdDB = async (id) => {
    try {
        const results = await pool.query(
            'SELECT * FROM veiculos WHERE id = $1', 
            [id]
        )
        const veiculo = results.rows[0]
        return new Veiculo(veiculo.id, veiculo.tipo, veiculo.placa, veiculo.cor)
    } catch (error) {
        throw "Erro: " + error
    }
}

module.exports = {
    getVeiculosDB,
    addVeiculoDB,
    updateVeiculoDB,
    deleteVeiculoDB,
    getVeiculoByIdDB
}