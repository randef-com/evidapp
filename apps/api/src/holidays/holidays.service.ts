import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {HolidaysRepository} from "./holidays.repository";
import {GetHolidaysFilterDto} from "./dto/get-holidays-filter.dto";
import {Holiday} from "./holiday.entity";


@Injectable()
export class HolidaysService {
  constructor(
    @InjectRepository(HolidaysRepository)
    private readonly holidaysRepository: HolidaysRepository
  ) {
  }

  async findAll(filterDto: GetHolidaysFilterDto): Promise<Holiday[]> {
    return this.holidaysRepository.getAllFiltered(filterDto);
  }
}
