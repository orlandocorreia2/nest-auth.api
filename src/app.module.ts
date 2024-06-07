import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './modules/home/home.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    HomeModule,
    DbModule,
  ],
})
export class AppModule {}
