const Clientes = require("../routes/Clientes");
const bcrypt = require('bcryptjs');

module.exports = app => {
    const ClienteModel = require('../../../04 - Domain/models/Cliente')
    const controller = {};

    controller.atualizarCliente = async(req, res) => {

        const {
            clienteId
        } = req.params;

        try {
            var auxQuery;
            if (req.body.complemento == undefined) {
                auxQuery = { "$unset": { "complemento": "" }, runValidators: true, context: 'query' }; //trabalhar nisso no futuro se necessário
            }

            if (!TestaCPF(req.body.cpf))
                res.status(500).send({ error: "CPF inválido!" });
            else {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
                await ClienteModel.findOneAndUpdate({ id: clienteId }, req.body, auxQuery);
                const cliente = await ClienteModel.findOne({ id: clienteId });
                res.status(200).send(cliente);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        };

    }

    controller.removerCliente = async(req, res) => {
        try {
            const {
                clienteId
            } = req.params;

            if (!await ClienteModel.findOne({ id: clienteId }))
                res.status(404).send({ error: 'Cliente não encontrado' });
            else {
                await ClienteModel.findOneAndDelete({ id: clienteId });
                res.status(200).send({ error: 'Cliente removido com sucesso!' });
            }
        } catch (err) {
            res.status(500).send(err);
        }

    }

    controller.consultarCliente = async(req, res) => {
        const { clienteId } = req.params;

        try {
            const cliente = await ClienteModel.findOne({ id: clienteId });
            if (Object.keys(cliente).length === 0)
                throw error;
            res.status(200).send(cliente);
        } catch (err) {
            console.log(err);
            res.status(404).send({ error: 'Cliente não encontrado' })
        }
    }

    return controller;
}

//https://www.devmedia.com.br/validar-cpf-com-javascript/23916
function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}