import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetEmployeesFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
