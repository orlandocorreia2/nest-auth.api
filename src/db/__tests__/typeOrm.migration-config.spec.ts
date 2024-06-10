import { DataSource } from 'typeorm';
import config from '../typeOrm.migration-config';

describe('DB', () => {
  it('should be defined', async () => {
    // Assert
    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(DataSource);
  });
});
