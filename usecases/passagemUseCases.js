const { pool } = require("../config");
const Passagem = require("../entities/passagem");

const getPassagensDB = async () => {
    try {
        const { rows } = await pool.query(
            "SELECT * FROM passagens ORDER BY id"
        );

        return rows.map(
            (passagem) =>
                new Passagem(
                    passagem.id,
                    passagem.veiculo,
                    passagem.local,
                    passagem.data_hora,
                    passagem.valor,
                    passagem.pago
                )
        );
    } catch (error) {
        throw "Erro: " + error;
    }
}

const addPassagemDB = async (body) => {
    try {
        const { veiculo, local, data_hora, valor, pago } = body;
        const result = await pool.query(
            "INSERT INTO passagens (veiculo, local, data_hora, valor, pago) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [veiculo, local, data_hora, valor, pago]
        );
        const passagem = result.rows[0];
        return new Passagem(
            passagem.id,
            passagem.veiculo,
            passagem.local,
            passagem.data_hora,
            passagem.valor,
            passagem.pago
        );
    } catch (error) {
        throw "Erro: " + error;
    }
}
const updatePassagemDB = async (body) => {
    try {
        const { id, veiculo, local, data_hora, valor, pago } = body;
        const result = await pool.query(
            "UPDATE passagens SET veiculo = $1, local = $2, data_hora = $3, valor = $4, pago = $5 WHERE id = $6 RETURNING *",
            [veiculo, local, data_hora, valor, pago, id]
        );

        if (result.rowCount === 0) {
            throw "Erro: Passagem não encontrada";
        }

        const passagem = result.rows[0];
        return new Passagem(
            passagem.id,
            passagem.veiculo,
            passagem.local,
            passagem.data_hora,
            passagem.valor,
            passagem.pago
        );
    } catch (error) {
        throw "Erro: " + error;
    }
}

const deletePassagemDB = async (id) => {
    try {
        const result = await pool.query(
            "DELETE FROM passagens WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            throw "Erro: Passagem não encontrada";
        }

        const passagem = result.rows[0];
        return new Passagem(
            passagem.id,
            passagem.veiculo,
            passagem.local,
            passagem.data_hora,
            passagem.valor,
            passagem.pago
        );
    } catch (error) {
        throw "Erro: " + error;
    }
}

const getPassagemByIdDB = async (id) => {
    try {
        const results = await pool.query(
            "SELECT * FROM passagens WHERE id = $1",
            [id]
        );

        if (results.rowCount === 0) {
            throw "Erro: Passagem não encontrada";
        } else {
            const passagem = results.rows[0];
            return new Passagem(
                passagem.id,
                passagem.veiculo,
                passagem.local,
                passagem.data_hora,
                passagem.valor,
                passagem.pago
            );
        }
    } catch (error) {
        throw "Erro: " + error;
    }
}

module.exports = {
    getPassagensDB,
    addPassagemDB,
    updatePassagemDB,
    deletePassagemDB,
    getPassagemByIdDB
}