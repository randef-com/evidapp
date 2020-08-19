import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import {EmployeesRepository} from "./employees.repository";
import {EmployeesService} from "./employees.service";
import {CreateEmployeeCommand} from "./commands/create-employee.command";

@Module({
  imports: [TypeOrmModule.forFeature([EmployeesRepository])],
  controllers: [EmployeesController],
  providers: [EmployeesService, CreateEmployeeCommand],
  exports: [EmployeesService, CreateEmployeeCommand],
})
export class EmployeesModule {}
