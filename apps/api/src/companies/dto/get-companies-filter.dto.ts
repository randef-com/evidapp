import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetCompaniesFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
