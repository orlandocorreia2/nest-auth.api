import { Injectable } from '@nestjs/common';
import { ITokenService } from '../interfaces/token.service.interface';

@Injectable()
export class FakeTokenService implements ITokenService {
  private tokens: string[] = [''];

  async findByToken(token: string) {
    return this.tokens.find((t) => t === token);
  }
}
