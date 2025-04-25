const {getPassagensDB, addPassagemDB, updatePassagemDB, deletePassagemDB, getPassagemByIdDB} = require('../usecases/passagemUseCases.js');

const getPassagens = async (req, res) => {
    await getPassagensDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const addPassagem = async (req, res) => {
    await addPassagemDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Passagem adicionada com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const updatePassagem = async (req, res) => {
    await updatePassagemDB(req.body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Passagem atualizada com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
} 

const deletePassagem = async (req, res) => {
    await deletePassagemDB(req.params.id)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Passagem deletada com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}   

const getPassagemById = async (req, res) => {
    await getPassagemByIdDB(req.params.id)
        .then(data => res.status(200).json({
            status : 'success',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

module.exports = {
    getPassagens,
    addPassagem,
    updatePassagem,
    deletePassagem,
    getPassagemById
}