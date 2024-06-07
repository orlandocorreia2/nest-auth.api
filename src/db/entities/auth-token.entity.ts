import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'auth_tokens' })
export class AuthTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar' })
  token: string;

  static create({ user_id, token }: any): AuthTokenEntity {
    const authTokenEntity = new AuthTokenEntity();
    authTokenEntity.id = uuidv4();
    authTokenEntity.user_id = user_id;
    authTokenEntity.token = token;
    return authTokenEntity;
  }
}
