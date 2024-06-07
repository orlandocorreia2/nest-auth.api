import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(255)
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
    { message: 'Password too weak' },
  )
  password: string;

  @ApiProperty()
  @IsIn([Math.random()], {
    message: 'Passwords do not match',
  })
  @ValidateIf((o) => o.password !== o.confirm_password)
  confirm_password: string;

  @ApiProperty()
  @Matches(/^(\d{4})[-](\d{2})[-](\d{2})$/, {
    message: `date_birth must be a valid date, Ex: ${new Date().toISOString().split('T')[0]}`,
  })
  date_birth: Date;
}
