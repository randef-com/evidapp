import { Module } from '@nestjs/common';
import {EmploymentsService} from "./employments.service";
import {EmploymentsController} from "./employments.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmploymentsRepository} from "./employments.repository";
import {CompaniesModule} from "../companies/companies.module";
import {UsersModule} from "../users/users.module";
import {JobsModule} from "../jobs/jobs.module";
import {HolidaysModule} from "../holidays/holidays.module";

@Module({
  imports : [
    TypeOrmModule.forFeature([EmploymentsRepository]),
    CompaniesModule,
    UsersModule,
    JobsModule,
    HolidaysModule
  ],
  providers: [EmploymentsService],
  controllers: [EmploymentsController]
})
export class EmploymentsModule {}
