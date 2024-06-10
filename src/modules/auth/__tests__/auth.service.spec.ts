import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthTokenEntity } from '../../../db/entities/auth-token.entity';
import { AuthService } from '../auth.service';
import { UsersService } from '../../../modules/users/users.service';
import { UserDto } from '../../../modules/users/dto/user.dto';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let repository: Repository<AuthTokenEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AuthTokenEntity),
          useValue: {
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockReturnValueOnce({
              id: 'id',
              name: 'name',
              email: 'email',
              password: 'password',
            } as UserDto),
          },
        },
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
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    repository = module.get<Repository<AuthTokenEntity>>(
      getRepositoryToken(AuthTokenEntity),
    );
  });

  it('should be defined', () => {
    // Assert
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('shoud be signIn with success', async () => {
      // Arrange
      jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);
      // Act
      const result = await service.signIn({
        email: 'email',
        password: 'password',
      });
      // Assert
      expect(result.token).toBe('token');
      expect(result.expiresIn).toBe(3600);
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('shoud be call with bcryptCompareSync error', async () => {
      try {
        // Act
        await service.signIn({
          email: 'email',
          password: 'password',
        });
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('signOut', () => {
    it('shoud be call error with no authorization', async () => {
      try {
        // Act
        await service.signOut({ authorization: '' });
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('shoud be call with verifyAsync error', async () => {
      // Arrange
      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockRejectedValueOnce(new BadRequestException());
      try {
        // Act
        await service.signOut({ authorization: 'authorization' });
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('shoud be signOut with success', async () => {
      // Arrange
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({});
      // Act
      await service.signOut({ authorization: 'authorization' });
      // Assert
      expect(jwtService.decode).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith({ user_id: 'sub' });
      expect(repository.delete).toHaveBeenCalledWith({
        token: 'authorization',
      });
    });
  });
});
