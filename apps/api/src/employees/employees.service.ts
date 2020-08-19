import {Injectable, HttpException, HttpStatus, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";
import {EmployeesRepository} from "./employees.repository";
import {GetEmployeesFilterDto} from "./dto/get-employees-filter.dto";
import {Employee} from "./employee.entity";
import {CreateEmployeeDto} from "./dto/create-employee.dto";

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeesRepository)
    private readonly employeesRepository: EmployeesRepository,
  ) {}

  public async findAll(filters: GetEmployeesFilterDto): Promise<Employee[]> {
    return await this.employeesRepository.getAllFiltered(filters);
  }

  public async findByEmail(email: string): Promise<Employee | null> {
    return await this.employeesRepository.findOne({email});
  }

  public async findById(id: number): Promise<Employee> {
    try{
      return await this.employeesRepository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException(`Employee with ID: ${id} doesn't exist.`);
      }
      throw ex;
    }
  }

  public async create(employee: CreateEmployeeDto): Promise<Employee> {
    const created_employee = this.employeesRepository.create(employee)
    return await this.employeesRepository.save(created_employee);
  }

  public async update(id: number, dto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.findById(id);
    const updated = Object.assign(employee, dto);
    return await this.employeesRepository.save(updated);
  }


  public async delete(id: number): Promise<DeleteResult> {
    return await this.employeesRepository.delete(id);
  }

  public async register(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const { email } = employeeDto;
    let employee = await this.employeesRepository.findOne({ where: { email } });
    if (employee) {
      throw new HttpException(
        'Employee already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    employee = await this.employeesRepository.create(employeeDto);
    return await this.employeesRepository.save(employee);
  }
}
