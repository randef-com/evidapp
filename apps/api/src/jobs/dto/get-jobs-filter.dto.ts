import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetJobsFilterDto {

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
