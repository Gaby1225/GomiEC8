const Motoristas = require("../routes/Motoristas");
const authMiddleman = require('../ManInTheMiddle/middleman.js')
const bcrypt = require('bcryptjs');
module.exports = app => {
    const MotoristaModel = require('../../../04 - Domain/models/Motorista');
    const controller = {};
    app.use(authMiddleman);

    controller.atualizarMotorista = async(req, res) => {

        const {
            motoristaId
        } = req.params;

        try {
            if (!TestaCPF(req.body.cpf))
                res.status(500).send({ error: "CPF inválido!" })
            else {
                const hash = await bcrypt.hash(req.body.senha, 10);
                req.body.senha = hash;
                await MotoristaModel.findOneAndUpdate({ id: motoristaId }, req.body, { runValidators: true });
                const motorista = await MotoristaModel.findOne({ id: motoristaId });
                res.status(200).send({ motorista });
            }
        } catch (err) {
            console.log(err);
            res.status(500).send({ error: "Falha na alteração ou motorista não encontrado" })
        }
    }

    controller.removerMotorista = async(req, res) => {
        try {
            const {
                motoristaId
            } = req.params;

            if (!await MotoristaModel.findOne({ id: motoristaId }))
                res.status(404).send({ error: 'Motorista não encontrado' });
            else {
                await MotoristaModel.findOneAndDelete({ id: motoristaId });
                res.status(200).send({ success: 'Motorista removido com sucesso!' });
            }

        } catch (err) {
            console.log(err);
            res.status(500).send({ error: "O motorista não pôde ser excluido. Tente novamente..." });
        }

    }

    controller.consultarMotorista = async(req, res) => {

        const {
            motoristaId
        } = req.params;

        try {
            const motorista = await MotoristaModel.findOne({ "id": motoristaId });
            if (Object.keys(motorista).length === 0)
                throw error;
            res.status(200).send(motorista);
        } catch (err) {
            console.log(err);
            res.status(404).send({ error: 'Motorista não encontrado!' });
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