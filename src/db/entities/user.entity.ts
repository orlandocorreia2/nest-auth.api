import { BadRequestException } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'date' })
  date_birth: Date;

  static create(createUserDto?: CreateUserDto): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = uuidv4();
    userEntity.name = createUserDto?.name;
    userEntity.email = createUserDto?.email;
    userEntity.password = bcryptHashSync(createUserDto?.password, 10);
    userEntity.date_birth = new Date(createUserDto?.date_birth);
    if (isNaN(userEntity.date_birth.getTime())) {
      throw new BadRequestException(
        `date_birth must be a valid date, Ex: ${new Date().toISOString().split('T')[0]}`,
      );
    }
    return userEntity;
  }
}
