import { UserDto } from '../user.dto';

describe('UserEntity', () => {
  let userDto: UserDto;

  beforeEach(() => {
    userDto = new UserDto();
  });

  it('should be defined', () => {
    // Assert
    expect(userDto).toBeDefined();
  });
});
