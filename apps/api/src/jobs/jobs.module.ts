import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JobsRepository} from "./jobs.repository";

@Module({
  imports: [TypeOrmModule.forFeature([JobsRepository])],
  providers: [JobsService],
  controllers: [JobsController],
  exports: [JobsService]
})
export class JobsModule {}
