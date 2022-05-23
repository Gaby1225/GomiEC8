const app = require('../../config/express');
const request = require('supertest');

var corpoMotorista = { nome: 'Juresbaldo', email: 'c@c.c', senha: 'ccc', nascimento: '1990-10-20', cpf: '87569460073', telefone: '+5511946626889', tipoVeiculo: 'Van', expiracao: '2024-10-30', cnh: '156489654', categoria: 'c', carga: '1000' };

const UserModel = require('../../04 - Domain/models/Motorista');

describe('Teste de Remover Motoristas', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;
    var login;
    var token;

    beforeAll(async() => {
        server = app.listen(8085);
    });

    beforeEach(async() => {
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista);
        login = await request(server).post('/auth/v2/login').send({ email: corpoMotorista.email, senha: corpoMotorista.senha });
        token = 'Bearer ' + login.body.token;
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await UserModel.findOneAndDelete({ email: "c@c.c" });
    });

    test('Atualizar Motorista Válido', async() => {
        var corpoMotoristaAtualizado = JSON.parse(JSON.stringify(corpoMotorista));
        corpoMotoristaAtualizado.senha = 'bbc';
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token).send(corpoMotoristaAtualizado).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoMotoristaAtualizado.email, senha: corpoMotoristaAtualizado.senha }).expect(200);
    });

    test('Atualizar Motorista E Logar Com Antigo', async() => {
        var corpoMotoristaAtualizado = JSON.parse(JSON.stringify(corpoMotorista));
        corpoMotoristaAtualizado.senha = 'bbc';
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token).send(corpoMotoristaAtualizado).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoMotorista.email, senha: corpoMotorista.senha }).expect(400);
    });

    test('Atualizar Motorista E Comparar', async() => {
        var corpoMotoristaAtualizado = JSON.parse(JSON.stringify(corpoMotorista));
        corpoMotoristaAtualizado.nome = 'blinkydoo';
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token).send(corpoMotoristaAtualizado).expect(200);
        corpoMotoristaConsultado = await request(server).get('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token);
        delete corpoMotoristaAtualizado.senha;
        delete corpoMotoristaConsultado.body.__v;
        delete corpoMotoristaConsultado.body.id;
        delete corpoMotoristaConsultado.body._id;
        corpoMotoristaAtualizado.nascimento = new Date(corpoMotoristaAtualizado.nascimento);
        corpoMotoristaAtualizado.nascimento = JSON.parse(JSON.stringify(corpoMotoristaAtualizado.nascimento));
        corpoMotoristaAtualizado.expiracao = new Date(corpoMotoristaAtualizado.expiracao);
        corpoMotoristaAtualizado.expiracao = JSON.parse(JSON.stringify(corpoMotoristaAtualizado.expiracao));
        corpoMotoristaAtualizado.carga = parseInt(corpoMotoristaAtualizado.carga);
        expect(corpoMotoristaAtualizado).toEqual(corpoMotoristaConsultado.body);
    });

    test('Atualizar CPF Inválido', async() => {
        var corpoMotoristaAtualizado = JSON.parse(JSON.stringify(corpoMotorista));
        corpoMotoristaAtualizado.cpf = '00011122233'
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token).send(corpoMotoristaAtualizado).expect(500);
    });

    test('Alterar Motorista Token Inválido', async() => {
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token + 'x').expect(401);
    });

    test('Alterar Motorista Token Mal Formatado', async() => {
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', 'x' + token).expect(401);
    });

    test('Alterar Motorista Sem Token', async() => {
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).expect(401);
    });

    test('Alterar Motorista Token Errado', async() => {
        await request(server).put('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', 'Bear ' + token).expect(401);
    });

});