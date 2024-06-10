import { Body, Controller, Post } from '@nestjs/common';
import { UserBusiness } from './users.business';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersBusiness: UserBusiness) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersBusiness.create(createUserDto);
    } catch (error) {
      return error;
    }
  }
}
