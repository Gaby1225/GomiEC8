const mongoose = require('../../03 - Data/banco');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
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
        required: true,
        maxlength: 11
    },
    telefone: {
        type: String,
        required: true
    },
    rua: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    complemento: {
        type: String
    },
    bairro: {
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        required: true
    }
});

ClienteSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;