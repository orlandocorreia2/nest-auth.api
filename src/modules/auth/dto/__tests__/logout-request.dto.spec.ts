import { LogoutRequestDto } from '../logout-request.dto';

describe('LogoutRequestDto', () => {
  it('should be create', () => {
    //Act
    const response = LogoutRequestDto.create();
    //Assert
    expect(response).toBeInstanceOf(LogoutRequestDto);
  });
});
