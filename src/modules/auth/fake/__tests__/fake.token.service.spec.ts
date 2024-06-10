import { FakeTokenService } from '../fake.token.service';

describe('FakeTokenService', () => {
  let fakeTokenService: FakeTokenService;

  beforeEach(() => {
    fakeTokenService = new FakeTokenService();
  });

  it('should be defined', () => {
    //Act
    expect(fakeTokenService).toBeDefined();
  });

  describe('findByToken', () => {
    it('should be call with success', async () => {
      //Act
      const response = await fakeTokenService.findByToken('token');
      //Assert
      expect(response).toBeUndefined();
    });
  });
});
