import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UsersService } from '../users/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthTokenEntity } from '../../db/entities/auth-token.entity';
import { LogoutRequestDto } from './dto/logout-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private readonly authTokensRepository: Repository<AuthTokenEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn({ email, password }: AuthRequestDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !bcryptCompareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    const token = this.jwtService.sign(payload);
    await this.authTokensRepository.delete({ user_id: user.id });
    const authTokenEntity = AuthTokenEntity.create({ user_id: user.id, token });
    await this.authTokensRepository.save(authTokenEntity);
    const expiresIn = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    return { token, expiresIn };
  }

  async signOut({ authorization }: LogoutRequestDto) {
    if (!authorization) {
      throw new BadRequestException('Authorization is required');
    }
    try {
      await this.jwtService.verifyAsync(authorization, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new BadRequestException('Authorization is invalid JWT');
    }
    const { sub } = this.jwtService.decode(authorization);
    await this.authTokensRepository.delete({ user_id: sub });
    await this.authTokensRepository.delete({ token: authorization });
  }
}
