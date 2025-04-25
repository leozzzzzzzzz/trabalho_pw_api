const {getTiposDB, addTipoDB, updateTipoDB, deleteTipoDB, getTipoByCodigoDB} = require('../usecases/tipoUseCases');

const getTipos = async (req, res) => {
    await getTiposDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}

const addTipo = async (req, res) => {
    await addTipoDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Tipo adicionado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}   

const updateTipo = async (req, res) => {
    await updateTipoDB(req.body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Tipo atualizado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}   

const deleteTipo = async (req, res) => {
    await deleteTipoDB(req.params.codigo)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Tipo deletado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : error
         }))
}   

const getTipoByCodigo = async (req, res) => {
    await getTipoByCodigoDB(req.params.codigo)
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
    getTipos,
    addTipo,
    updateTipo,
    deleteTipo,
    getTipoByCodigo
}