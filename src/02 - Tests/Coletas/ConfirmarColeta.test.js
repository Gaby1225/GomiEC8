const app = require('../../config/express');
const request = require('supertest');

const corpoColeta = { nome: 'Coleta de Trap Senegales', tipo: 'Trap Senegales', peso: '999', clienteId: 'joycon', };

const ColetaModel = require('../../04 - Domain/models/Coleta');

describe('Teste Confirmar Coleta', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;
    var token;
    var coletaCriada;

    beforeAll(() => {
        server = app.listen(8082);
    });

    beforeEach(async() => {
        const login = await request(server).post('/auth/v2/login').send({ email: 'a@a.a', senha: 'aaa' });
        token = 'Bearer ' + login.body.token;
        coletaCriada = await request(server).post('/api/v2/coletas').send(corpoColeta).set('Authorization', token);
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token)
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await ColetaModel.findOneAndDelete({ nome: "Coleta de Trap Senegales" });
    });

    test('Confirmar Coleta', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', token).expect(200);
    });

    test('Confirmar Coleta Sem Motorista (Não Aceita)', async() => {
        await request(server).put('/api/v2/coletas/975a66a1-dc0c-4300-8629-4389de24993f/confirmacao').set('Authorization', token).expect(500);
    });

    test('Confirmar Coleta Confirmada', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', token).expect(200);
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', token).expect(500);
    });

    test('Confirmar Coleta Token Inválido', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', token + 'x').expect(401);
    });

    test('Confirmar Coleta Token Mal Formatado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', 'x' + token).expect(401);
    });

    test('Confirmar Coleta Sem Token', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').expect(401);
    });

    test('Confirmar Coleta Token Errado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/confirmacao').set('Authorization', 'Bear ' + token).expect(401);
    });
});