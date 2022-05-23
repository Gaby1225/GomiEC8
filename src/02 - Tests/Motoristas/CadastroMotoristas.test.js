const app = require('../../config/express');
const request = require('supertest');

var corpoMotorista = { nome: 'Juresbaldo', email: 'c@c.c', senha: 'ccc', nascimento: '1990-10-20', cpf: '87569460073', telefone: '+5511946626889', tipoVeiculo: 'Van', expiracao: '2024-10-30', cnh: '156489654', categoria: 'c', carga: '1000' };

const UserModel = require('../../04 - Domain/models/Motorista');

describe('Teste de Cadastrar Motorista', () => {
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
        await UserModel.findOneAndDelete({ email: "c@c.c" });
    });

    test('Cadastro Motorista Completo', async() => {
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(200);
    });

    test('Atualizar CPF Inválido', async() => {
        var corpoMotoristaAtualizado = JSON.parse(JSON.stringify(corpoMotorista));
        corpoMotoristaAtualizado.cpf = '00011122233'
        await request(server).post('/auth/v2/motoristas/').send(corpoMotoristaAtualizado).expect(400);
    });

    test('Cadastro Motorista Sem Nome', async() => {
        delete corpoMotorista.nome;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });

    test('Cadastro Motorista Sem Email', async() => {
        delete corpoMotorista.email;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });

    test('Cadastro Motorista Sem Senha', async() => {
        delete corpoMotorista.senha;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });

    test('Cadastro Motorista Sem Nascimento', async() => {
        delete corpoMotorista.nascimento;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });

    test('Cadastro Motorista Sem CPF', async() => {
        delete corpoMotorista.cpf;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });

    test('Cadastro Motorista Sem Telefone', async() => {
        delete corpoMotorista.telefone;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
    //tipoVeiculo expiracao cnh categoria carga
    test('Cadastro Motorista Sem Tipo Veiculo', async() => {
        delete corpoMotorista.tipoVeiculo;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
    test('Cadastro Motorista Sem Expiracao', async() => {
        delete corpoMotorista.expiracao;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
    test('Cadastro Motorista Sem CNH', async() => {
        delete corpoMotorista.cnh;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
    test('Cadastro Motorista Sem Categoria', async() => {
        delete corpoMotorista.categoria;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
    test('Cadastro Motorista Sem Carga', async() => {
        delete corpoMotorista.carga;
        await request(server).post('/auth/v2/motoristas').send(corpoMotorista).expect(400);
    });
});