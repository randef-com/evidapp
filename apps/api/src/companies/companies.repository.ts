import {EntityRepository, Repository} from "typeorm";
import {Company} from "./company.entity";
import {GetCompaniesFilterDto} from "./dto/get-companies-filter.dto";

@EntityRepository(Company)
export class CompaniesRepository extends Repository<Company> {
  async getAllFiltered(
    filterDto: GetCompaniesFilterDto
  ): Promise<Company[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('company');

    if (search) {
      query.andWhere('company.name LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
