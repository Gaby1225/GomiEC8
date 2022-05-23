const Coletas = require("../routes/Coletas");
const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const ColetaModel = require('../../../04 - Domain/models/Coleta');
    const controller = {};

    controller.listaColetasDisponiveis = async(req, res) => {

        const coletas = await ColetaModel.find({ 'motoristaId': undefined });

        try {
            if (Object.keys(coletas).length === 0)
                return res.status(404).send({ message: "Nenhuma coleta disponível no momento. Volte novamente mais tarde!" });

            res.status(200).send(coletas);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    };

    controller.descricaoColeta = async(req, res) => {
        try {
            const {
                coletaId
            } = req.params;

            const descricao = await ColetaModel.findOne({ id: coletaId });
            if (Object.keys(descricao).length === 0)
                throw error;

            res.status(200).send(descricao);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    };

    controller.listaColetas = async(req, res) => {
        try {
            if (req.query.motorista != undefined) {
                var coletasMotorista = await ColetaModel.find({ 'motoristaId': req.query.motorista });
                if (Object.keys(coletasMotorista).length === 0)
                    throw error;
                res.status(200).send(coletasMotorista);
            } else if (req.query.cliente != undefined) {
                var coletasCliente = await ColetaModel.find({ 'clienteId': req.query.cliente });
                if (Object.keys(coletasCliente).length === 0)
                    throw error;
                res.status(200).send(coletasCliente);
            } else {
                res.status(404).send({ error: "Nenhuma coleta encontrada neste usuário" });
            }
        } catch (err) {
            res.status(404).send({ error: "Usuário não encontrado!" });
        }
    };

    controller.criarColeta = async(req, res) => {

        try {
            req.body.id = uuidv4();
            if (req.body.status == undefined || req.body.status == true)
                req.body.status = false;
            if (req.body.motoristaId != undefined)
                delete req.body.motoristaId;

            const newColeta = await ColetaModel.create(req.body);
            res.status(201).send(newColeta);
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Falha no Registro' });
        }
    };

    controller.alterarColeta = async(req, res) => {

        const {
            coletaId
        } = req.params;

        try {

            var coletaEncontrada = await ColetaModel.findOne({ id: coletaId });
            if (coletaEncontrada == null || Object.keys(coletaEncontrada).length === 0)
                return res.status(404).send({ error: "Coleta não encontrada!" });
            if (req.body.status == undefined)
                req.body.status = false;
            if (req.body.status != false)
                throw error;
            if (coletaEncontrada.motoristaId != undefined)
                throw error;
            await ColetaModel.findOneAndUpdate({ id: coletaId }, req.body, { runValidators: true });
            const coleta = await ColetaModel.findOne({ id: coletaId });
            res.status(200).send(coleta);

        } catch (err) {
            console.log(err);
            res.status(500).send({ error: "Não foi possível alterar a coleta!" });
        };


    }

    controller.removeColeta = async(req, res) => {
        try {
            const {
                coletaId
            } = req.params;

            if (!await ColetaModel.findOne({ id: coletaId }))
                return res.status(404).send({ error: 'Coleta não encontrada' });

            await ColetaModel.findOneAndDelete({ id: coletaId });
            res.status(200).send({ success: 'Coleta removida com sucesso!' })

        } catch (err) {
            res.status(500).send(err);
        };


    }

    controller.confirmarColeta = async(req, res) => {
        const {
            coletaId
        } = req.params;

        try {
            const coletaEncontrada = await ColetaModel.findOne({ id: coletaId });
            if (coletaEncontrada.motoristaId != undefined && coletaEncontrada.status == false) {
                coletaEncontrada.status = true;
                await ColetaModel.findOneAndUpdate({ id: coletaId }, coletaEncontrada, { runValidators: true })
                res.status(200).send({ success: "Coleta Aceita, Confirmada e encerrada" });
            } else if (coletaEncontrada.motoristaId == undefined) {
                res.status(500).send({ error: "Coleta ainda não possui motorista. Não é possível confirmar" });
            } else if (coletaEncontrada.status == true) {
                res.status(500).send({ error: "Coleta já confirmada" })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    }

    controller.aceitarColeta = async(req, res) => {
        const {
            coletaId
        } = req.params;

        try {
            const coletaEncontrada = await ColetaModel.findOne({ id: coletaId });
            if (coletaEncontrada.motoristaId == undefined) {
                coletaEncontrada.motoristaId = req.body.motoristaId;
                await ColetaModel.findOneAndUpdate({ id: coletaId }, coletaEncontrada, { runValidators: true })
                res.status(200).send({ success: "Coleta Aceita" }); //descobrir como apenas adicionar um campo no documento
            } else if (coletaEncontrada.motoristaId != req.body.motoristaId) {
                res.status(400).send({ err: "Coleta aceita por outro motorista" })
            } else {
                coletaEncontrada.motoristaId = undefined;
                await ColetaModel.findOneAndUpdate({ id: coletaId }, { $unset: { motoristaId: "" } }, { runValidators: true });
                res.status(200).send({ success: "Coleta Rejeitada" }); //descobrir como apenas adicionar um campo no documento
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    }

    return controller;
}