const app = require('../../config/express');
const request = require('supertest');

describe('Teste de Login', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;

    beforeAll(() => {
        server = app.listen(8081);
    });

    afterAll(done => {
        server.close(done);
    });

    test('Login correto', async() => {
        const corpoLogin = { email: 'a@a.a', senha: 'aaa' };
        await request(server).post('/auth/v2/login').send(corpoLogin).expect(200);
    });

    test('Senha incorreta', async() => {
        const corpoLogin = { email: 'a@a.a', senha: 'aab' };
        await request(server).post('/auth/v2/login').send(corpoLogin).expect(400);
    });

    test('Email incorreta', async() => {
        const corpoLogin = { email: 'a@a.b', senha: 'aaa' };
        await request(server).post('/auth/v2/login').send(corpoLogin).expect(400);
    });

    test('Login vazio', async() => {
        const corpoLogin = { email: '', senha: '' };
        await request(server).post('/auth/v2/login').send(corpoLogin).expect(400);
    });
});