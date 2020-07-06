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
    private readonly repository: JobsRepository,
  ) {
  }

  async findAll(filterDto: GetJobsFilterDto): Promise<Job[]> {
    return this.repository.getAllFiltered(filterDto);
  }

  public async findById(id: number): Promise<Job> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException(`Job with ID: ${id} doesn't exist.`);
      }
      throw ex;
    }
  }

  public async create(job: CreateJobDto): Promise<Job> {
    return await this.repository.save(job);
  }

  public async update(id: number, dto: CreateJobDto): Promise<Job> {
    const job = await this.findById(id);
    const updated = Object.assign(job, dto)
    return await this.repository.save(updated);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
