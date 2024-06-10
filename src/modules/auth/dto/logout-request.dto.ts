import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class LogoutRequestDto {
  @ApiProperty()
  @IsJWT()
  authorization: string;

  static create(data?: LogoutRequestDto) {
    const instance = new LogoutRequestDto();
    instance.authorization = data?.authorization;
    return instance;
  }
}
