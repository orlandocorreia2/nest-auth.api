import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth.guard';
import { TokenService } from '../token.service';
import { AuthTokenEntity } from '../../../db/entities/auth-token.entity';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        TokenService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValueOnce('token'),
            verifyAsync: jest.fn().mockRejectedValue(new BadRequestException()),
            decode: jest.fn().mockReturnValueOnce({ sub: 'sub' }),
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
            findByToken: jest.fn().mockResolvedValueOnce(null),
          },
        },
        {
          provide: getRepositoryToken(AuthTokenEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    // Assert
    expect(authGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should be error not found token', async () => {
      //Arrange
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { authorization: '' } }),
        }),
      };
      try {
        //Act
        await authGuard.canActivate(context);
      } catch (error) {
        //Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it('should be error service not found token', async () => {
      //Arrange
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
        }),
      };
      try {
        //Act
        await authGuard.canActivate(context);
      } catch (error) {
        //Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});

describe('', () => {
  let authGuard: AuthGuard;
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        TokenService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValueOnce('token'),
            verifyAsync: jest.fn().mockRejectedValue(new BadRequestException()),
            decode: jest.fn().mockReturnValueOnce({ sub: 'sub' }),
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
            findByToken: jest.fn().mockResolvedValueOnce(
              AuthTokenEntity.create({
                user_id: 'user_id',
                token: 'token',
              }),
            ),
          },
        },
        {
          provide: getRepositoryToken(AuthTokenEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    service = module.get<TokenService>(TokenService);
  });

  describe('canActivate', () => {
    it('should be error jwtService.verifyAsync', async () => {
      //Arrange
      const context = {
        switchToHttp: () => ({
          getRequest: () => ({ headers: { authorization: 'Bearer token' } }),
        }),
      };
      try {
        //Act
        await authGuard.canActivate(context);
      } catch (error) {
        //Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
