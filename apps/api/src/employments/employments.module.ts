import { Module } from '@nestjs/common';
import {EmploymentsService} from "./employments.service";
import {EmploymentsController} from "./employments.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmploymentsRepository} from "./employments.repository";
import {CompaniesModule} from "../companies/companies.module";
import {JobsModule} from "../jobs/jobs.module";
import {HolidaysModule} from "../holidays/holidays.module";
import {EmployeesModule} from "../employees/employees.module";

@Module({
  imports : [
    TypeOrmModule.forFeature([EmploymentsRepository]),
    CompaniesModule,
    EmployeesModule,
    JobsModule,
    HolidaysModule
  ],
  providers: [EmploymentsService],
  controllers: [EmploymentsController]
})
export class EmploymentsModule {}
