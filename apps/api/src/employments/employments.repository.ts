import {EntityRepository, Repository} from "typeorm";
import {Employment} from "./employment.entity";
import {GetEmploymentsFilterDto} from "./dto/get-employments-filter.dto";

@EntityRepository(Employment)
export class EmploymentsRepository extends Repository<Employment> {

  async getAllFiltered(filterDto: GetEmploymentsFilterDto): Promise<Employment[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('employment');
    // query.leftJoinAndSelect("employment.user", "user")
    // query.leftJoinAndSelect("employment.job", "job")
    // query.leftJoinAndSelect("employment.company", "company")
    //
    // if (year) {
    //   query.andWhere('holiday.date >= :year', {year} );
    // }

    return await query.getMany();
  }
}
