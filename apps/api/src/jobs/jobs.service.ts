import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult} from "typeorm";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";
import {JobsRepository} from "./jobs.repository";
import {GetJobsFilterDto} from "./dto/get-jobs-filter.dto";
import {Job} from "./job.entity";
import {CreateJobDto} from "./dto/create-job.dto";

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobsRepository)
    private readonly companiesRepository: JobsRepository,
  ) {
  }

  async findAll(
    filterDto: GetJobsFilterDto
  ): Promise<Job[]> {
    return this.companiesRepository.getAllFiltered(filterDto);
  }

  public async findById(id: number): Promise<Job> {
    try {
      return await this.companiesRepository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      throw ex;
    }
  }

  public async create(company: CreateJobDto): Promise<Job> {
    return await this.companiesRepository.save(company);
  }

  public async update(
    id: number,
    newValue: CreateJobDto,
  ): Promise<Job> {
    const user = await this.companiesRepository.findOneOrFail(id);
    if (!user.id) {
      throw new NotFoundException();
    }
    await this.companiesRepository.update(id, newValue);
    return await this.companiesRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.companiesRepository.delete(id);
  }
}
