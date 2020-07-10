import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, Min, Max, IsMilitaryTime} from 'class-validator';

export class CreateEmployeeExportDto {

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly employmentId: number;

  @IsMilitaryTime()
  @IsNotEmpty()
  @ApiProperty()
  readonly shiftStart: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  @ApiProperty()
  readonly shiftEnd: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  @ApiProperty()
  readonly breakStart: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  @ApiProperty()
  readonly breakEnd: Date;



  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly companyId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly jobId: number;

}
