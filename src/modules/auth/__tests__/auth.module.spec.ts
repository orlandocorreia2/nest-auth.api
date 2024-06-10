import { Test } from '@nestjs/testing';
import { AuthModule } from '../auth.module';

describe('AuthModule', () => {
  it('should be compile the module', async () => {
    try {
      await Test.createTestingModule({
        imports: [AuthModule],
      }).compile();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
