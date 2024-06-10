import { Test, TestingModule } from '@nestjs/testing';
import { AuthBusiness } from '../auth.business';
import { AuthController } from '../auth.controller';
import { AuthRequestDto } from '../dto/auth-request.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LogoutRequestDto } from '../dto/logout-request.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authRequestDto: AuthRequestDto;
  let logoutRequestDto: LogoutRequestDto;
  let authBusiness: AuthBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthBusiness,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              token: 'token',
              expiresIn: 3600,
            } as AuthResponseDto),
            signOut: jest.fn(),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();
    authRequestDto = AuthRequestDto.create({
      email: 'email',
      password: 'password',
    });
    logoutRequestDto = LogoutRequestDto.create({
      authorization: 'authorization',
    });

    controller = module.get<AuthController>(AuthController);
    authBusiness = module.get<AuthBusiness>(AuthBusiness);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should signIn successfuly', async () => {
      // Act
      const result = await controller.signIn(authRequestDto);
      // Assert
      expect(result.token).toBe('token');
      expect(result.expiresIn).toBe(3600);
    });

    it('should signIn error', async () => {
      // Arrange
      jest.spyOn(authBusiness, 'signIn').mockRejectedValueOnce(new Error());
      // Assert
      try {
        await controller.signIn(authRequestDto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('signOut', () => {
    it('signOut signIn successfuly', async () => {
      // Act
      await controller.signOut(logoutRequestDto);
      // Assert
      expect(authBusiness.signOut).toHaveBeenCalledTimes(1);
    });

    it('should signIn error', async () => {
      // Arrange
      jest.spyOn(authBusiness, 'signOut').mockRejectedValueOnce(new Error());
      // Assert
      try {
        await controller.signOut(logoutRequestDto);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
