const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../config/auth.json')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


const MotoristaModel = require('../../../04 - Domain/models/Motorista');
const ClienteModel = require('../../../04 - Domain/models/Cliente');

function generateToken(params = []) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 28800
    });
}

//#region Login
router.post('/Login', async(req, res) => {

    const { email, senha } = req.body;

    const usuarioM = await MotoristaModel.findOne({ email }).select('+senha');

    if (!usuarioM) {
        const usuarioC = await ClienteModel.findOne({ email }).select('+senha');

        if (!usuarioC) {
            return res.status(400).send({ error: 'Usuário ou senha inválidos' });
        }

        if (!await bcrypt.compare(senha, usuarioC.senha)) {
            return res.status(400).send({ error: 'Usuário ou senha inválidos' });
        }

        usuarioC.senha = undefined;

        return res.send({
            usuarioC,
            token: generateToken({ id: usuarioC.id })
        });
    }

    if (!await bcrypt.compare(senha, usuarioM.senha)) {
        return res.status(400).send({ error: 'Usuário ou senha inválidos' });
    }

    usuarioM.senha = undefined;

    res.status(200).send({
        usuarioM,
        token: generateToken({ id: usuarioM.id })
    });

});
//#endregion
//#region Criar Motorista
router.post('/Motoristas', async(req, res) => {
    const { email } = req.body;
    try {
        if (await MotoristaModel.findOne({ email })) {
            return res.status(400).send({ error: 'Usuário já existente' });
        }
        if (!TestaCPF(req.body.cpf))
            throw error
        req.body.id = uuidv4();
        const newMotorista = await MotoristaModel.create(req.body);

        newMotorista.senha = undefined;

        res.send(newMotorista);
    } catch (err) {
        return res.status(400).send({ error: 'Falha no Registro' });
    }
});
//#endregion
//#region Criar Cliente
router.post('/Clientes', async(req, res) => {

    const { email } = req.body;

    try {
        if (await ClienteModel.findOne({ email })) {
            return res.status(400).send({ error: 'Usuário já existente' });
        }
        if (!TestaCPF(req.body.cpf))
            throw error
        req.body.id = uuidv4();
        const newCliente = await ClienteModel.create(req.body);

        newCliente.senha = undefined;

        res.send(newCliente);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha no Registro' });
    }
});
//#endregion

module.exports = app => app.use('/auth/v2', router);


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