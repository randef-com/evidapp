import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class CreateJobDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

}
