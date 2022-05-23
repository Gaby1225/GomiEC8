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
        server = app.listen(8084);
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

    test('Remover Motorista Válido', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token).expect(200);
        await request(server).post('/auth/v2/login').send({ email: corpoMotorista.email, senha: corpoMotorista.senha }).expect(400);
    });

    test('Remover Motorista Inexistente', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id + 'xxx').set('Authorization', token).expect(404);
    });

    test('Remover Motorista Token Inválido', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', token + 'x').expect(401);
    });

    test('Remover Motorista Token Mal Formatado', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', 'x' + token).expect(401);
    });

    test('Remover Motorista Sem Token', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id).expect(401);
    });

    test('Remover Motorista Token Errado', async() => {
        await request(server).delete('/api/v2/motoristas/' + login.body.usuarioM.id).set('Authorization', 'Bear ' + token).expect(401);
    });
});