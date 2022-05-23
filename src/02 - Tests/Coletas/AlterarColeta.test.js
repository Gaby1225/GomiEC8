const app = require('../../config/express');
const request = require('supertest');

const corpoColeta = { nome: 'Coleta de Trap Senegales', tipo: 'Trap Senegales', peso: '999', clienteId: 'joycon', };

const ColetaModel = require('../../04 - Domain/models/Coleta');

describe('Teste Alterar Coleta', () => {
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

    test('Alterar Coleta Correto', async() => {
        var coletaCriadaAtualizada = JSON.parse(JSON.stringify(coletaCriada.body));
        coletaCriadaAtualizada.tipo = 'Trap Senegalense';
        await request(server).put('/api/v2/coletas/' + coletaCriadaAtualizada.id).send(coletaCriadaAtualizada).set('Authorization', token).expect(200);
        expect((await request(server).get('/api/v2/coletas/' + coletaCriada.body.id).set('Authorization', token)).body.tipo).toEqual('Trap Senegalense');
    });

    test('Alterar Coleta Com Motorista', async() => {
        var coletaCriadaAtualizada = (await request(server).get('/api/v2/coletas/d351ee2d-dccc-4375-9f95-766b8f6c717c').set('Authorization', token)).body;
        coletaCriadaAtualizada.tipo = 'Trap Senegalense';
        await request(server).put('/api/v2/coletas/' + coletaCriadaAtualizada.id).send(coletaCriadaAtualizada).set('Authorization', token).expect(500);
    });

    test('Alterar Coleta Finalizada', async() => {
        var coletaCriadaAtualizada = (await request(server).get('/api/v2/coletas/7708206f-2e77-44df-a191-269c7adb32bd').set('Authorization', token)).body;
        coletaCriadaAtualizada.tipo = 'Trap Senegalense';
        await request(server).put('/api/v2/coletas/' + coletaCriadaAtualizada.id).send(coletaCriadaAtualizada).set('Authorization', token).expect(500);
    });

    test('Alterar Coleta Inexistente', async() => {
        var coletaCriadaAtualizada = JSON.parse(JSON.stringify(coletaCriada.body));
        await request(server).put('/api/v2/coletas/xx' + coletaCriadaAtualizada.id).send(coletaCriadaAtualizada).set('Authorization', token).expect(404);
    });

    test('Alterar Coleta Token Inválido', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', token + 'x').expect(401);
    });

    test('Alterar Coleta Token Mal Formatado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', 'x' + token).expect(401);
    });

    test('Alterar Coleta Sem Token', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).expect(401);
    });

    test('Alterar Coleta Token Errado', async() => {
        await request(server).put('/api/v2/coletas/' + coletaCriada.body.id).send(corpoColeta).set('Authorization', 'Bear ' + token).expect(401);
    });
});