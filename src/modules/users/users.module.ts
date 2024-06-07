import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserBusiness } from './users.business';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module({
  providers: [UserBusiness, UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
