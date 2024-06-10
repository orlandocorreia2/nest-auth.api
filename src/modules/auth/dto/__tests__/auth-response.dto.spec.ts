import { AuthResponseDto } from '../auth-response.dto';

describe('AuthResponseDto', () => {
  it('should be create', () => {
    //Act
    const response = AuthResponseDto.create();
    //Assert
    expect(response).toBeInstanceOf(AuthResponseDto);
  });
});
