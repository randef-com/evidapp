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
    private readonly companiesRepository: CompaniesRepository,
  ) {
  }

  async findAll(filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    return this.companiesRepository.getAllFiltered(filterDto);
  }

  public async findById(id: number): Promise<Company> {
    try {
      return await this.companiesRepository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }
      throw ex;
    }
  }

  public async create(company: CreateCompanyDto): Promise<Company> {
    return await this.companiesRepository.save(company);
  }

  public async update(id: number, newValue: CreateCompanyDto): Promise<Company> {
    const user = await this.companiesRepository.findOneOrFail(id);
    if (!user.id) {
      throw new NotFoundException(`Company with ID: ${id} has not been found`);
    }
    await this.companiesRepository.update(id, newValue);
    return await this.companiesRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.companiesRepository.delete(id);
  }
}
