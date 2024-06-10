import { DbModule } from '../db.module';

describe('DB', () => {
  it('should be defined', async () => {
    expect(DbModule).toBeDefined();
  });
});
