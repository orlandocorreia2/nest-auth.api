import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TokenService } from '../../auth/token.service';
import { HomeController } from '../home.controller';
import { AuthTokenEntity } from '../../../db/entities/auth-token.entity';

describe('AuthController', () => {
  let controller: HomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn().mockResolvedValueOnce(true),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              const objectKeysValue = {
                JWT_SECRET: 'JWT_SECRET',
                JWT_EXPIRATION_TIME: 3600,
              };
              return objectKeysValue[key] || '';
            },
          },
        },
        {
          provide: 'ITokenService',
          useClass: TokenService,
          useValue: {
            findByToken: jest.fn().mockResolvedValueOnce({ token: 'token' }),
          },
        },
        {
          provide: getRepositoryToken(AuthTokenEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValueOnce({ token: 'token' }),
          },
        },
      ],
      controllers: [HomeController],
    }).compile();

    controller = module.get<HomeController>(HomeController);
  });

  it('should be defined', () => {
    // Assert
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    it('shoud be call findAll with success', () => {
      //Act
      const response = controller.index();
      //Assert
      expect(response.message).toBe('User Authenticated');
    });
  });
});
