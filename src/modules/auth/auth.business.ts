import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LogoutRequestDto } from './dto/logout-request.dto';

@Injectable()
export class AuthBusiness {
  constructor(private readonly authService: AuthService) {}

  async signIn(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(authRequestDto);
  }

  async signOut(logoutRequestDto: LogoutRequestDto) {
    return await this.authService.signOut(logoutRequestDto);
  }
}
