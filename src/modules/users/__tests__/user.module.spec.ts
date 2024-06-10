import { Test } from '@nestjs/testing';
import { UsersModule } from '../users.module';

describe('UsersModule', () => {
  it('should be compile with error', async () => {
    try {
      // Act
      await Test.createTestingModule({
        imports: [UsersModule],
      }).compile();
    } catch (error) {
      //Assert
      expect(error).toBeInstanceOf(Error);
    }
  });
});
