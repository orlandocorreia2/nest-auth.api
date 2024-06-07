import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { AuthRequestDto } from './dto/auth-request.dto';
import { AuthBusiness } from './auth.business';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LogoutRequestDto } from './dto/logout-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authBusiness: AuthBusiness) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() authRequestDto: AuthRequestDto,
  ): Promise<AuthResponseDto> {
    try {
      return await this.authBusiness.signIn(authRequestDto);
    } catch (error) {
      return error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  async signOut(@Headers() logoutRequestDto: LogoutRequestDto): Promise<any> {
    try {
      return await this.authBusiness.signOut(logoutRequestDto);
    } catch (error) {
      return error;
    }
  }
}
