import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthBusiness } from './auth.business';
import { UsersModule } from '../users/users.module';
import { AuthTokenEntity } from '../../db/entities/auth-token.entity';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TypeOrmModule.forFeature([AuthTokenEntity]),
  ],
  providers: [
    AuthBusiness,
    AuthService,
    { provide: 'ITokenService', useClass: TokenService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
