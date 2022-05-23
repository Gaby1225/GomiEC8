const app = require('../../config/express');
const request = require('supertest');

var corpoCliente = { nome: 'Adamastor', email: 'b@b.b', senha: 'bbb', nascimento: '1990-10-20', cpf: '87569460073', telefone: '+5511946626888', rua: 'Rua A', numero: 2, bairro: 'jardim a', complemento: 'Apartamento a', cidade: 'araçariguama', cep: '09814625' };

const UserModel = require('../../04 - Domain/models/Cliente');

describe('Teste de Remover Clientes', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;
    var login;
    var token;

    beforeAll(async() => {
        server = app.listen(8084);
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

    test('Remover Cliente Válido', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoCliente.email, senha: corpoCliente.senha }).expect(400);
    });

    test('Remover Cliente Inexistente', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id + 'xxx').set('Authorization', token).expect(404);
    });

    test('Remover Cliente Token Inválido', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', token + 'x').expect(401);
    });

    test('Remover Cliente Token Mal Formatado', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', 'x' + token).expect(401);
    });

    test('Remover Cliente Sem Token', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id).expect(401);
    });

    test('Remover Cliente Token Errado', async() => {
        await request(server).delete('/api/v2/clientes/' + login.body.usuarioC.id).set('Authorization', 'Bear ' + token).expect(401);
    });
});