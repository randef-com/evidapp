import { ApiProperty } from '@nestjs/swagger';
import {IsString, MinLength, IsEmail, IsArray, IsOptional, IsNotEmpty} from 'class-validator';

export class CreateEmployeeDto {

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

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  readonly roles: string[];
}
