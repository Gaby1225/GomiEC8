const app = require('../../config/express');
const request = require('supertest');

var corpoCliente = { nome: 'Adamastor', email: 'b@b.b', senha: 'bbb', nascimento: '1990-10-20', cpf: '87569460073', telefone: '+5511946626888', rua: 'Rua A', numero: 2, bairro: 'jardim a', complemento: 'Apartamento a', cidade: 'araçariguama', cep: '09814625' };

const UserModel = require('../../04 - Domain/models/Cliente');

describe('Teste de Cadastrar Clientes', () => {
    it('Roda o App', () => {
        expect(app).toBeDefined();
    });

    let server;

    beforeAll(() => {
        server = app.listen(8082);
    });

    afterAll(done => {
        server.close(done);
    });

    afterEach(async() => {
        await UserModel.findOneAndDelete({ email: "b@b.b" });
    });

    test('Cadastro Cliente Completo', async() => {
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(200);
    });

    test('Cadastrar CPF Inválido', async() => {
        var corpoClienteAtualizado = JSON.parse(JSON.stringify(corpoCliente));
        corpoClienteAtualizado.cpf = '00011122233'
        await request(server).post('/auth/v2/clientes/').send(corpoClienteAtualizado).expect(400);
    });

    test('Cadastro Cliente Sem Complemento', async() => {
        delete corpoCliente.complemento
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(200);
    });

    test('Cadastro Cliente Sem Nome', async() => {
        delete corpoCliente.nome;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Email', async() => {
        delete corpoCliente.email;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Senha', async() => {
        delete corpoCliente.senha;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Nascimento', async() => {
        delete corpoCliente.nascimento;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem CPF', async() => {
        delete corpoCliente.cpf;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Telefone', async() => {
        delete corpoCliente.telefone;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });
    //rua numero bairro cidade cep
    test('Cadastro Cliente Sem Rua', async() => {
        delete corpoCliente.rua;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Numero', async() => {
        delete corpoCliente.numero;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Bairro', async() => {
        delete corpoCliente.bairro;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem Cidade', async() => {
        delete corpoCliente.cidade;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

    test('Cadastro Cliente Sem CEP', async() => {
        delete corpoCliente.cep;
        await request(server).post('/auth/v2/clientes').send(corpoCliente).expect(400);
    });

});