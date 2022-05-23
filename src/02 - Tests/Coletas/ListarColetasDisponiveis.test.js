const app = require('../../config/express');
const request = require('supertest');

describe('Teste Listar Coletas Disponíveis', () => {
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

    test('Listar Coletas Disponíveis Correto', async() => {
        var disponiveis = await request(server).get('/api/v2/coletas/disponivel').set('Authorization', token).expect(200);
        expect(disponiveis.body.length).toEqual(4);
    });

    test('Listar Coletas Token Inválido', async() => {
        await request(server).get('/api/v2/coletas/disponivel').set('Authorization', token + 'x').expect(401);
    });

    test('Listar Coletas Token Mal Formatado', async() => {
        await request(server).get('/api/v2/coletas/disponivel').set('Authorization', 'x' + token).expect(401);
    });

    test('Listar Coletas Sem Token', async() => {
        await request(server).get('/api/v2/coletas/disponivel').expect(401);
    });

    test('Listar Coletas Token Errado', async() => {
        await request(server).get('/api/v2/coletas/disponivel').set('Authorization', 'Bear ' + token).expect(401);
    });

});