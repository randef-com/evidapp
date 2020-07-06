import {IsOptional, IsNumber} from 'class-validator';

export class GetHolidaysFilterDto {

  @IsOptional()
  @IsNumber()
  year: number;
}
