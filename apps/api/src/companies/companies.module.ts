import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompaniesRepository} from "./companies.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CompaniesRepository])],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService]
})
export class CompaniesModule {}
