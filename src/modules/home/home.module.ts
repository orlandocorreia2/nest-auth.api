import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { TokenService } from '../auth/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenEntity } from '../../db/entities/auth-token.entity';

@Module({
  controllers: [HomeController],
  providers: [{ provide: 'ITokenService', useClass: TokenService }],
  imports: [TypeOrmModule.forFeature([AuthTokenEntity])],
})
export class HomeModule {}
