const app = require('../../config/express');
const request = require('supertest');

describe('Teste Listar Coletas', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;
    var token;

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

    test('Listar Coletas Cliente Gray', async() => {
        var gray = await request(server).get('/api/v2/coletas?cliente=grayjoycon').set('Authorization', token).expect(200);
        expect(gray.body.length).toEqual(1);
    });

    test('Listar Coletas Cliente Neon', async() => {
        var neon = await request(server).get('/api/v2/coletas?cliente=neonjoycon').set('Authorization', token).expect(200);
        expect(neon.body.length).toEqual(5);
    });

    test('Listar Coletas Motorista OLED', async() => {
        var oled = await request(server).get('/api/v2/coletas?motorista=OLEDfromCHINA').set('Authorization', token).expect(200);
        expect(oled.body.length).toEqual(2);
    });

    test('Listar Coletas Cliente Errado', async() => {
        await request(server).get('/api/v2/coletas?cliente=redbluejoycon').set('Authorization', token).expect(404);
    });

    test('Listar Coletas Motorista Errado', async() => {
        await request(server).get('/api/v2/coletas?motorista=OLEDfromBRAZIL').set('Authorization', token).expect(404);
    });

    test('Listar Coletas Errado', async() => {
        await request(server).get('/api/v2/coletas?motoristo=OLEDfromChina').set('Authorization', token).expect(404);
    });

    test('Listar Coletas Sem Query', async() => {
        await request(server).get('/api/v2/coletas').set('Authorization', token).expect(404);
    });

    test('Listar Coletas Token Inválido', async() => {
        await request(server).get('/api/v2/coletas?cliente=grayjoycon').set('Authorization', token + 'x').expect(401);
    });

    test('Listar Coletas Token Mal Formatado', async() => {
        await request(server).get('/api/v2/coletas?cliente=grayjoycon').set('Authorization', 'x' + token).expect(401);
    });

    test('Listar Coletas Sem Token', async() => {
        await request(server).get('/api/v2/coletas?cliente=grayjoycon').expect(401);
    });

    test('Listar Coletas Token Errado', async() => {
        await request(server).get('/api/v2/coletas?cliente=grayjoycon').set('Authorization', 'Bear ' + token).expect(401);
    });
});