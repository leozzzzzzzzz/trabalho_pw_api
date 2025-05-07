const { getLocaisDB, addLocalDB, updateLocalDB, deleteLocalDB, getLocalByCodigoDB } = require('../usecases/localUseCases');

const getLocais = async (req, res) => {
    await getLocaisDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const addLocal = async (req, res) => {
    await addLocalDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Local adicionado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const updateLocal = async (req, res) => {
    await updateLocalDB(req.params.codigo, req.body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Local atualizado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const deleteLocal = async (req, res) => {
    await deleteLocalDB(req.params.codigo)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Local deletado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}   

const getLocalByCodigo = async (req, res) => {
    await getLocalByCodigoDB(req.params.codigo)
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
    getLocais,
    addLocal,
    updateLocal,
    deleteLocal,
    getLocalByCodigo
}