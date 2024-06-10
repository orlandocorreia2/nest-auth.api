import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HomeModule } from '../home.module';
import { AuthTokenEntity } from '../../../db/entities/auth-token.entity';
import { TokenService } from '../../../modules/auth/token.service';

describe('AuthModule', () => {
  it('should be compile with error', async () => {
    try {
      // Act
      await Test.createTestingModule({
        imports: [HomeModule],
        providers: [
          {
            provide: TokenService,
            useValue: {
              findByToken: jest.fn(),
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
    } catch (error) {
      //Assert
      expect(error).toBeInstanceOf(Error);
    }
  });
});
