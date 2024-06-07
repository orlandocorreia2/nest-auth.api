import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Injectable()
export class UserBusiness {
  constructor(private readonly usersService: UsersService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException(`User '${user.email}' already registered`);
    }
    return await this.usersService.create(createUserDto);
  }
}
