import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../../db/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userEntity = UserEntity.create(createUserDto);
    const { id, email } = await this.usersRepository.save(userEntity);
    return { id, email };
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
