import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult} from "typeorm";
import {Company} from "./company.entity";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {CompaniesRepository} from "./companies.repository";
import {GetCompaniesFilterDto} from "./dto/get-companies-filter.dto";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompaniesRepository)
    private readonly repository: CompaniesRepository,
  ) {
  }

  async findAll(filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    return this.repository.getAllFiltered(filterDto);
  }

  public async findById(id: number): Promise<Company> {
    try {
      return await this.repository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException(`Company with ID: ${id} doesn't exist.`);
      }
      throw ex;
    }
  }

  public async create(company: CreateCompanyDto): Promise<Company> {
    return await this.repository.save(company);
  }

  public async update(id: number, dto: CreateCompanyDto): Promise<Company> {
    const company = await this.findById(id);
    const updated = Object.assign(company, dto)
    return await this.repository.save(updated);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
