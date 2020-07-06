import {EntityRepository, Repository} from "typeorm";
import {Holiday} from "./holiday.entity";
import {GetHolidaysFilterDto} from "./dto/get-holidays-filter.dto";

@EntityRepository(Holiday)
export class HolidaysRepository extends Repository<Holiday> {

  async getAllFiltered(filterDto: GetHolidaysFilterDto): Promise<Holiday[]> {
    const { year } = filterDto;
    const query = this.createQueryBuilder('holiday');

    if (year) {
      query.andWhere('holiday.date >= :year', {year} );
    }

    return await query.getMany();
  }
}
