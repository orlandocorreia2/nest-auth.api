import { Table } from 'typeorm';
import { UsersTable1717560955741 as UsersTable } from '../1717560955741-users-table';

describe('Migrations:UsersTable', () => {
  let usersTable: any;
  let queryRunner: any;

  beforeEach(() => {
    usersTable = new UsersTable();
    queryRunner = {
      query: jest.fn(),
      createTable: jest.fn(),
      dropTable: jest.fn(),
    };
  });

  it('should be defined', async () => {
    expect(usersTable).toBeDefined();
  });

  describe('up', () => {
    it('should be create table', async () => {
      // Act
      await usersTable.up(queryRunner);

      // Assert
      expect(queryRunner.query).toHaveBeenCalledWith(
        `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,
      );
      expect(queryRunner.createTable).toHaveBeenCalledWith(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'email',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'date_birth',
              type: 'timestamp',
            },
          ],
        }),
      );
    });
  });

  describe('down', () => {
    it('should be drop table', async () => {
      // Act
      await usersTable.down(queryRunner);

      // Assert
      expect(queryRunner.dropTable).toHaveBeenCalledWith(`users`);
    });
  });
});
