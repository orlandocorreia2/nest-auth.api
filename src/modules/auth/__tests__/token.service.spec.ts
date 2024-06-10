import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from '../token.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthTokenEntity } from '../../../db/entities/auth-token.entity';
import { Repository } from 'typeorm';

describe('TokenService', () => {
  let service: TokenService;
  let repository: Repository<AuthTokenEntity>;
  let authTokenEntity: AuthTokenEntity;

  beforeEach(async () => {
    authTokenEntity = AuthTokenEntity.create({
      user_id: 'user_id',
      token: 'token',
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: getRepositoryToken(AuthTokenEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(authTokenEntity),
          },
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
    repository = module.get<Repository<AuthTokenEntity>>(
      getRepositoryToken(AuthTokenEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should find successfuly', async () => {
    // Act
    const result = await service.findByToken('token');

    // Assert
    expect(result.token).toBe('token');
    expect(repository.findOne).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception', () => {
    // Arrange
    jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error());

    // Assert
    expect(service.findByToken('token')).rejects.toThrow(Error);
  });
});
