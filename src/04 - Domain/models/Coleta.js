const mongoose = require('../../03 - Data/banco');

const ColetaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    peso: {
        type: Number
    },
    status: {
        type: Boolean,
        required: true
    },
    clienteId: {
        type: String,
        required: true
    },
    motoristaId: {
        type: String,
    }
});

const Coleta = mongoose.model('Coleta', ColetaSchema);

module.exports = Coleta;