const app = require('../../config/express');
const request = require('supertest');

const corpoCliente = { nome: 'Adamastor', email: 'b@b.b', senha: 'bbb', nascimento: '1990-10-20', cpf: '87569460073', telefone: '+5511946626888', rua: 'Rua A', numero: 2, bairro: 'jardim a', complemento: 'Apartamento a', cidade: 'araçariguama', cep: '09814625' };

const UserModel = require('../../04 - Domain/models/Cliente');
const { get } = require('config');

describe('Teste de Remover Clientes', () => {
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
        await request(server).post('/auth/v2/clientes').send(corpoCliente);
        login = await request(server).post('/auth/v2/login').send({ email: corpoCliente.email, senha: corpoCliente.senha });
        token = 'Bearer ' + login.body.token;
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await UserModel.findOneAndDelete({ email: "b@b.b" });
    });

    test('Atualizar Cliente Válido', async() => {
        var corpoClienteAtualizado = JSON.parse(JSON.stringify(corpoCliente));
        corpoClienteAtualizado.senha = 'bbc';
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token).send(corpoClienteAtualizado).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoClienteAtualizado.email, senha: corpoClienteAtualizado.senha }).expect(200);
    });

    test('Atualizar Cliente E Logar Com Antigo', async() => {
        var corpoClienteAtualizado = JSON.parse(JSON.stringify(corpoCliente));
        corpoClienteAtualizado.senha = 'bbc';
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token).send(corpoClienteAtualizado).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoCliente.email, senha: corpoCliente.senha }).expect(400);
    });

    test('Atualizar Cliente E Comparar', async() => {
        var corpoClienteAtualizado = JSON.parse(JSON.stringify(corpoCliente));
        corpoClienteAtualizado.nome = 'blinkydoo';
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token).send(corpoClienteAtualizado).expect(200);
        corpoClienteConsultado = await request(server).get('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token);
        delete corpoClienteAtualizado.senha;
        delete corpoClienteConsultado.body.__v;
        delete corpoClienteConsultado.body.id;
        delete corpoClienteConsultado.body._id;
        corpoClienteAtualizado.nascimento = new Date(corpoClienteAtualizado.nascimento);
        corpoClienteAtualizado.nascimento = JSON.parse(JSON.stringify(corpoClienteAtualizado.nascimento));
        expect(corpoClienteAtualizado).toEqual(corpoClienteConsultado.body);
    });

    test('Atualizar CPF Inválido', async() => {
        var corpoClienteAtualizado = JSON.parse(JSON.stringify(corpoCliente));
        corpoClienteAtualizado.cpf = '00011122233'
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token).send(corpoClienteAtualizado).expect(500);
    });

    test('Alterar Cliente Token Inválido', async() => {
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token + 'x').expect(401);
    });

    test('Alterar Cliente Token Mal Formatado', async() => {
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', 'x' + token).expect(401);
    });

    test('Alterar Cliente Sem Token', async() => {
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).expect(401);
    });

    test('Alterar Cliente Token Errado', async() => {
        await request(server).put('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', 'Bear ' + token).expect(401);
    });

});