import { AuthRequestDto } from '../auth-request.dto';

describe('AuthRequestDto', () => {
  it('should be create', () => {
    //Act
    const response = AuthRequestDto.create();
    //Assert
    expect(response).toBeInstanceOf(AuthRequestDto);
  });
});
