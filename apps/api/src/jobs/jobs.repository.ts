import {EntityRepository, Repository} from "typeorm";
import {Job} from "./job.entity";
import {GetJobsFilterDto} from "./dto/get-jobs-filter.dto";

@EntityRepository(Job)
export class JobsRepository extends Repository<Job> {
  async getAllFiltered(
    filterDto: GetJobsFilterDto
  ): Promise<Job[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('job');

    if (search) {
      query.andWhere('job.name LIKE :search', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
