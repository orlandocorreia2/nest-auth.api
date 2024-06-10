import { AuthTokenEntity } from '../auth-token.entity';

describe('AuthEntity', () => {
  let authTokenEntity: AuthTokenEntity;

  beforeEach(() => {
    authTokenEntity = new AuthTokenEntity();
  });

  it('should be defined', () => {
    // Assert
    expect(authTokenEntity).toBeDefined();
  });

  describe('create', () => {
    it('should be create successfully', () => {
      // Act
      const authTokenEntity = AuthTokenEntity.create({
        user_id: 'user_id',
        token: 'token',
      });
      // Assert
      expect(authTokenEntity.user_id).toBe('user_id');
    });
  });
});
