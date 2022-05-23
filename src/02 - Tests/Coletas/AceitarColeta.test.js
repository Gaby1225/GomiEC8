const app = require('../../config/express');
const request = require('supertest');

const corpoColeta = { nome: 'Coleta de Trap Senegales', tipo: 'Trap Senegales', peso: '999', clienteId: 'joycon', };

const ColetaModel = require('../../04 - Domain/models/Coleta');

describe('Teste Aceitar Coleta', () => {
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

    test('Aceitar Coleta', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(200);
    });

    test('Recusar Coleta Aceita', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(200);
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(200);
    });

    test('Aceitar Coleta de Outro Motorista', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(200);
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lito' }).set('Authorization', token).expect(400);
    });

    test('Aceitar Coleta Inexistente', async() => {
        await request(server).put('/api/v2/coletas/xxx' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(500);
    });

    test('Aceitar Coleta Concluida', async() => {
        await request(server).put('/api/v2/coletas/7708206f-2e77-44df-a191-269c7adb32bd/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token).expect(400);
    });

    test('aceitar Coleta Token Inválido', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', token + 'x').expect(401);
    });

    test('aceitar Coleta Token Mal Formatado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', 'x' + token).expect(401);
    });

    test('aceitar Coleta Sem Token', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).expect(401);
    });

    test('aceitar Coleta Token Errado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id + '/motorista').send({ motoristaId: 'Lite' }).set('Authorization', 'Bear ' + token).expect(401);
    });
});