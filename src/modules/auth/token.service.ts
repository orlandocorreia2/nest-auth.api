import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthTokenEntity } from '../../db/entities/auth-token.entity';
import { Repository } from 'typeorm';
import { ITokenService } from './interfaces/token.service.interface';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    @InjectRepository(AuthTokenEntity)
    private readonly authTokensRepository: Repository<AuthTokenEntity>,
  ) {}

  async findByToken(token: string) {
    return await this.authTokensRepository.findOne({ where: { token } });
  }
}
