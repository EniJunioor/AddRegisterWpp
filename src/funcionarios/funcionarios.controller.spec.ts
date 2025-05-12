import { Test, TestingModule } from '@nestjs/testing';
import { FuncionariosController } from './funcionarios.controller';

describe('FuncionariosController', () => {
  let controller: FuncionariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuncionariosController],
    }).compile();

    controller = module.get<FuncionariosController>(FuncionariosController);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um novo funcionário', () => {
    const mock = {
  id : 1 ,
  nome: 'João Silva',
  pis: '123456789',
  cpf: '123.456.789-00',
  cartao: '12345',
  empresa: 'Empresa X',
  geo: 'Localizacao',
  mestre: 'Mestre A',
  email: 'joao.silva@example.com', // Adicione o email
  matricula: 'MATR1234', // Adicione a matricula
};
    const resultado = controller.create(mock);
    expect(resultado).toMatchObject(mock);
    expect(resultado).toHaveProperty('id');
  });
});
