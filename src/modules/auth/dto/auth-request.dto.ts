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

  static create(data?: AuthRequestDto) {
    const instance = new AuthRequestDto();
    instance.email = data?.email;
    instance.password = data?.password;
    return instance;
  }
}
