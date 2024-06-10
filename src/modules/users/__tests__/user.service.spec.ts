import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { UserEntity } from '../../../db/entities/user.entity';

describe('AuthService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn().mockResolvedValueOnce({ id: 'id', email: 'email' }),
            findOne: jest
              .fn()
              .mockResolvedValueOnce({ id: 'id', email: 'email' }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    // Assert
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('shoud be call success', async () => {
      //Act
      const response = await service.create({
        name: 'name',
        email: 'email',
        password: 'password',
        confirm_password: 'password',
        date_birth: new Date(),
      });
      //Assert
      expect(response.id).toBeDefined();
      expect(response.email).toBe('email');
    });
  });

  describe('findByEmail', () => {
    it('shoud be call success', async () => {
      //Act
      const response = await service.findByEmail('email');
      //Assert
      expect(response.id).toBeDefined();
      expect(response.email).toBe('email');
    });
  });
});
