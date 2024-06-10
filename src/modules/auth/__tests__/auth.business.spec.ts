import { Test, TestingModule } from '@nestjs/testing';
import { AuthBusiness } from '../auth.business';
import { AuthService } from '../auth.service';

describe('AuthBusiness', () => {
  let business: AuthBusiness;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthBusiness,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue({
              token: 'token',
              expiresIn: 3600,
            }),
            signOut: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    business = module.get<AuthBusiness>(AuthBusiness);
  });

  it('should be defined', () => {
    // Assert
    expect(business).toBeDefined();
  });

  describe('signIn', () => {
    it('should signIn successfuly', async () => {
      // Act
      const result = await business.signIn({
        email: 'email',
        password: 'password',
      });
      // Assert
      expect(result.token).toBe('token');
    });
  });

  describe('signOut', () => {
    it('should signOut successfuly', async () => {
      // Act
      await business.signOut({ authorization: 'authorization' });
      // Assert
      expect(service.signOut).toHaveBeenCalledTimes(1);
    });
  });
});
