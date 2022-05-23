const mongoose = require('../../03 - Data/banco');
const bcrypt = require('bcryptjs');

const MotoristaSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    nascimento: {
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    tipoVeiculo: {
        type: String,
        required: true
    },
    cnh: {
        type: String,
        required: true
    },
    expiracao: {
        type: Date,
        required: true
    },
    categoria: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1
    },
    carga: {
        type: Number,
        required: true
    }
});

MotoristaSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Motorista = mongoose.model('Motorista', MotoristaSchema);;

module.exports = Motorista;