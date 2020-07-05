import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @ApiProperty()
  readonly firstName: string;

  @IsString()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @MinLength(5)
  @ApiProperty()
  readonly password: string;
}
