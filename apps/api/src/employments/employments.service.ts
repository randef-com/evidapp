import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";
import {DeleteResult} from "typeorm";
import {EmploymentsRepository} from "./employments.repository";
import {GetEmploymentsFilterDto} from "./dto/get-employments-filter.dto";
import {Employment} from "./employment.entity";
import {CreateEmploymentDto} from "./dto/create-employment.dto";
import {UsersService} from "../users/users.service";
import {CompaniesService} from "../companies/companies.service";
import {JobsService} from "../jobs/jobs.service";

@Injectable()
export class EmploymentsService {
  constructor(
    @InjectRepository(EmploymentsRepository)
    private readonly repository: EmploymentsRepository,
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
    private readonly jobsService: JobsService
  ) {
  }

  async findAll(filterDto: GetEmploymentsFilterDto): Promise<Employment[]> {
    return this.repository.getAllFiltered(filterDto);
  }

  public async findById(id: number): Promise<Employment> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException(`Employment with ID: ${id} doesn't exist.`);      }
      throw ex;
    }
  }


  public async create(dto: CreateEmploymentDto): Promise<Employment> {

    const user = await this.usersService.findById(dto.userId);
    const company = await this.companiesService.findById(dto.companyId);
    const job = await this.jobsService.findById(dto.jobId);

    return this.repository.save({
      ...dto,
      user,
      company,
      job
    });

  }

  public async update(id: number, newValue: CreateEmploymentDto): Promise<Employment> {
    const user = await this.findById(id);
    if (!user.id) {
      throw new NotFoundException();
    }
    await this.repository.update(id, newValue);
    return await this.repository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
