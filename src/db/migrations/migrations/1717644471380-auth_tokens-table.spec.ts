import { Table, TableForeignKey } from 'typeorm';
import { AuthTokensTable1717644471380 as AuthTokensTable } from '../1717644471380-auth_tokens-table';

describe('Migrations:UsersTable', () => {
  let authTokensTable: any;
  let queryRunner: any;

  beforeEach(() => {
    authTokensTable = new AuthTokensTable();
    queryRunner = {
      query: jest.fn(),
      createTable: jest.fn(),
      createForeignKey: jest.fn(),
      dropTable: jest.fn(),
    };
  });

  it('should be defined', async () => {
    expect(authTokensTable).toBeDefined();
  });

  describe('up', () => {
    it('should be create table', async () => {
      // Act
      await authTokensTable.up(queryRunner);

      // Assert
      expect(queryRunner.query).toHaveBeenCalledWith(
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
      );
      expect(queryRunner.createTable).toHaveBeenCalledWith(
        new Table({
          name: 'auth_tokens',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'user_id',
              type: 'uuid',
            },
            {
              name: 'token',
              type: 'varchar',
              isUnique: true,
            },
          ],
        }),
      );
      expect(queryRunner.createForeignKey).toHaveBeenCalledWith(
        'auth_tokens',
        new TableForeignKey({
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
      );
    });
  });

  describe('down', () => {
    it('should be drop table', async () => {
      // Act
      await authTokensTable.down(queryRunner);

      // Assert
      expect(queryRunner.dropTable).toHaveBeenCalledWith(`auth_tokens`);
    });
  });
});
