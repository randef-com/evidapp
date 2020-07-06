import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetEmploymentsFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
