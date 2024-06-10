import { CreateUserDto } from '../create-user.dto';

describe('UserEntity', () => {
  let createUserDto: CreateUserDto;

  beforeEach(() => {
    createUserDto = new CreateUserDto();
  });

  it('should be defined', () => {
    // Assert
    expect(createUserDto).toBeDefined();
  });

  describe('create', () => {
    it('shoud be create successfully', () => {
      // Act
      const date_birth = new Date();
      const createUserDto = CreateUserDto.create({
        name: 'name',
        email: 'email',
        password: 'password',
        confirm_password: 'confirm_password',
        date_birth,
      });

      //Assert
      expect(createUserDto.name).toBe('name');
      expect(createUserDto.email).toBe('email');
      expect(createUserDto.password).toBe('password');
      expect(createUserDto.confirm_password).toBe('confirm_password');
      expect(createUserDto.date_birth).toBe(date_birth);
    });
  });
});
