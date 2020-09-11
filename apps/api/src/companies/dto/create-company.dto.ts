import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class CreateCompanyDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the company",
  })
  readonly name: string;

}
