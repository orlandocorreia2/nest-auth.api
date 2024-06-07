import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('KEY_AUTH')
@UseGuards(AuthGuard)
@Controller('home')
export class HomeController {
  @Get()
  index() {
    return {
      message: 'User Authenticated',
    };
  }
}
