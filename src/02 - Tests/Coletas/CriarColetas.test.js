const app = require('../../config/express');
const request = require('supertest');

const corpoColeta = { nome: 'Coleta de Trap Senegales', tipo: 'Trap Senegales', peso: '999', clienteId: 'joycon', };

const ColetaModel = require('../../04 - Domain/models/Coleta');

describe('Teste de Cadastrar Coleta', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;
    var token

    beforeAll(() => {
        server = app.listen(8082);
    });

    beforeEach(async() => {
        const login = await request(server).post('/auth/v2/login').send({ email: 'a@a.a', senha: 'aaa' });
        token = 'Bearer ' + login.body.token;
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await ColetaModel.findOneAndDelete({ nome: "Coleta de Trap Senegales" });
    });

    test('Cadastro Coleta Completo', async() => {
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(201);
    });

    test('Cadastro Coleta Sem Peso', async() => {
        delete corpoColeta.peso;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(201);
    });

    test('Cadastro Coleta Com Status', async() => {
        corpoColeta.status = false;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(201);
    });

    test('Cadastro Coleta Com Status True', async() => {
        corpoColeta.status = true;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(201);
    });

    test('Cadastro Coleta Com Motorista', async() => {
        corpoColeta.motoristaId = 'El Motoka';
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(201);
    });

    test('Cadastro Coleta Sem Nome', async() => {
        delete corpoColeta.nome;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(400);
    });

    test('Cadastro Coleta Sem Tipo', async() => {
        delete corpoColeta.tipo;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(400);
    });

    test('Cadastro Coleta Sem Cliente', async() => {
        delete corpoColeta.clienteId;
        await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token).expect(400);
    });

    test('Cadastro Coleta Token Inválido', async() => {
        await request(server).put('/api/v2/coletas/').send(corpoColeta).set('Authorization', token + 'x').expect(401);
    });

    test('Cadastro Coleta Token Mal Formatado', async() => {
        await request(server).put('/api/v2/coletas/').send(corpoColeta).set('Authorization', 'x' + token).expect(401);
    });

    test('Cadastro Coleta Sem Token', async() => {
        await request(server).put('/api/v2/coletas/').send(corpoColeta).expect(401);
    });

    test('Cadastro Coleta Token Errado', async() => {
        await request(server).put('/api/v2/coletas/').send(corpoColeta).set('Authorization', 'Bear ' + token).expect(401);
    });

});