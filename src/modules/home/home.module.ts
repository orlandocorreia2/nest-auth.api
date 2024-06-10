import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../auth/token.service';
import { AuthTokenEntity } from '../../db/entities/auth-token.entity';
import { HomeController } from './home.controller';

@Module({
  controllers: [HomeController],
  providers: [{ provide: 'ITokenService', useClass: TokenService }],
  // imports: [TypeOrmModule.forFeature([AuthTokenEntity])],
})
export class HomeModule {}
