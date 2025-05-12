import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((user) => ({
              id: 1,
              ...user,
            })),
            findAll: jest.fn().mockReturnValue([
              { id: 1, nome: 'Danilo', PIS: '069489278873' },
              { id: 2, nome: 'Envivander', PIS: '015948031814' },
            ]),
            findOne: jest.fn().mockImplementation((id) => ({
              id,
              nome: 'Danilo',
              PIS: '069489278873',
            })),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    expect(controller.findAll()).toEqual([
      { id: 1, nome: 'Danilo', PIS: '069489278873' },
      { id: 2, nome: 'Envivander', PIS: '015948031814' },
    ]);
  });

  it('should return one user by ID', () => {
    expect(controller.findOne('1')).toEqual({
      id: '1',
      nome: 'Danilo',
      PIS: '069489278873',
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

it('should create a new user', () => {
  const user = {
    nome: 'Rachel',
    pis: '083230088581',
    empresa: 'ID Store Teste',
    geo: true,
    mestre: false,
  };

  const expected = { id: 1, ...user };
  expect(controller.create(user)).toEqual(expected);
  expect(service.create).toHaveBeenCalledWith(user);
});
});

