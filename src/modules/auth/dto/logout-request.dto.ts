import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class LogoutRequestDto {
  @ApiProperty()
  @IsJWT()
  authorization: string;
}
