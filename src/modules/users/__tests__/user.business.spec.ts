import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserBusiness } from '../users.business';
import { ConflictException } from '@nestjs/common';

describe('AuthService', () => {
  let business: UserBusiness;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserBusiness,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest
              .fn()
              .mockResolvedValue({ id: 'id', email: 'email' }),
            create: jest.fn().mockResolvedValue({ id: 'id', email: 'email' }),
          },
        },
      ],
    }).compile();

    business = module.get<UserBusiness>(UserBusiness);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    // Assert
    expect(business).toBeDefined();
  });

  describe('create', () => {
    it('shoud be call error conflict user already exists', async () => {
      try {
        //Act
        await business.create({
          name: 'name',
          email: 'email',
          password: 'password',
          confirm_password: 'password',
          date_birth: new Date(),
        });
      } catch (error) {
        //Assert
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('shoud be create with success', async () => {
      //Arrange
      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce(null);
      //Act
      const response = await business.create({
        name: 'name',
        email: 'email',
        password: 'password',
        confirm_password: 'password',
        date_birth: new Date(),
      });
      //Assert
      expect(response.id).toBeDefined();
    });
  });
});
