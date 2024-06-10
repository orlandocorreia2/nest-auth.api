import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UserBusiness } from '../users.business';

describe('AuthController', () => {
  let controller: UsersController;
  let userBusiness: UserBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserBusiness,
          useValue: {
            create: jest.fn().mockRejectedValue(new Error()),
          },
        },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userBusiness = module.get<UserBusiness>(UserBusiness);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('shoud be call findAll with error', async () => {
      try {
        //Act
        await controller.create({
          name: 'name',
          email: 'email',
          password: 'password',
          confirm_password: 'password',
          date_birth: new Date(),
        });
      } catch (error) {
        //Assert
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('shoud be call findAll with success', async () => {
      //Arrange
      jest
        .spyOn(userBusiness, 'create')
        .mockResolvedValueOnce({ id: 'id', email: 'email' });
      //Act
      const response = await controller.create({
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
});
