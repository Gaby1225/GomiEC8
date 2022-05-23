const app = require('../../config/express');
const request = require('supertest');

const corpoColeta = { nome: 'Coleta de Trap Senegales', tipo: 'Trap Senegales', peso: '999', clienteId: 'joycon', };

const ColetaModel = require('../../04 - Domain/models/Coleta');

describe('Teste Remover Coleta', () => {
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
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await ColetaModel.findOneAndDelete({ nome: "Coleta de Trap Senegales" });
    });

    test('Remover Coleta Correto', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).set('Authorization', token).expect(200);
    });

    test('Remover Coleta Removida', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).set('Authorization', token).expect(200);
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).set('Authorization', token).expect(404);
    });

    test('Remover Coleta Removida', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id + 'xx').set('Authorization', token).expect(404);
    });

    test('Remover Descrição Coleta Token Inválido', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', token + 'x').expect(401);
    });

    test('Remover Descrição Coleta Token Mal Formatado', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', 'x' + token).expect(401);
    });

    test('Remover Descrição Coleta Sem Token', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).expect(401);
    });

    test('Remover Descrição Coleta Token Errado', async() => {
        await request(server).delete('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', 'Bear ' + token).expect(401);
    });
});