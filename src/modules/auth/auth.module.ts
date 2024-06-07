import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthBusiness } from './auth.business';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthTokenEntity } from 'src/db/entities/auth-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
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
