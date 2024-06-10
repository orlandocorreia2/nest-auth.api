import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

type AuthTokenEntityCreateProps = { user_id: string; token: string };

@Entity({ name: 'auth_tokens' })
export class AuthTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'varchar' })
  token: string;

  static create(
    authTokenEntityCreateProps?: AuthTokenEntityCreateProps,
  ): AuthTokenEntity {
    const authTokenEntity = new AuthTokenEntity();
    authTokenEntity.id = uuidv4();
    authTokenEntity.user_id = authTokenEntityCreateProps?.user_id;
    authTokenEntity.token = authTokenEntityCreateProps?.token;
    return authTokenEntity;
  }
}
