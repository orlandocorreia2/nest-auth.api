import { BadRequestException } from '@nestjs/common';
import { UserEntity } from '../user.entity';

describe('UserEntity', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity();
  });

  it('should be defined', () => {
    // Assert
    expect(userEntity).toBeDefined();
  });

  describe('create', () => {
    it('should be create successfully', () => {
      //Act
      const userEntity = UserEntity.create({
        name: 'name',
        email: 'email',
        password: 'password',
        confirm_password: 'password',
        date_birth: new Date(),
      });

      //Asset
      expect(userEntity.name).toBe('name');
    });

    it('should be create with date_birth error', () => {
      //Asset
      try {
        UserEntity.create({
          name: 'name',
          email: 'email',
          password: 'password',
          confirm_password: 'password',
          date_birth: new Date('2024-15-15'),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
