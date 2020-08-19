import {EntityRepository, Repository} from "typeorm";
import {Employment} from "./employment.entity";
import {GetEmploymentsFilterDto} from "./dto/get-employments-filter.dto";

@EntityRepository(Employment)
export class EmploymentsRepository extends Repository<Employment> {

  async getAllFiltered(filterDto: GetEmploymentsFilterDto): Promise<Employment[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('employment');
    query.leftJoinAndSelect("employment.job", "job")
    query.leftJoinAndSelect("employment.company", "company")

    if (search) {
      query.andWhere('(employment.email LIKE :search ' +
        'OR employment.firstName LIKE :search ' +
        'OR employment.lastName LIKE :search)', {search: `%${search}%`} );
    }

    return await query.getMany();
  }
}
