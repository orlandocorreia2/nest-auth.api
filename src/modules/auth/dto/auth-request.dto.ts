import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class AuthRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    { message: 'Password too weak' },
  )
  password: string;
}
