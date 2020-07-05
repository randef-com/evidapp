import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post, Put,
  Query, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {DeleteResult} from "typeorm";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthGuard} from "@nestjs/passport";
import {JobsService} from "./jobs.service";
import {GetJobsFilterDto} from "./dto/get-jobs-filter.dto";
import {Job} from "./job.entity";
import {CreateJobDto} from "./dto/create-job.dto";

@ApiTags('jobs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UsePipes(ValidationPipe)
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get()
  @Roles('admin')
  getJobs(@Query() filterDto: GetJobsFilterDto): Promise<Job[]> {
    return this.jobsService.findAll(filterDto);
  }

  @Get('/:id')
  @Roles('admin')
  getJobById(@Param('id', ParseIntPipe) id: number
  ): Promise<Job> {
    return this.jobsService.findById(id);
  }

  @Post()
  @Roles('admin')
  createJob(@Body() dto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(dto);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteJob(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.jobsService.delete(id);
  }

  @Put('/:id')
  @Roles('admin')
  updateJob(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateJobDto
  ): Promise<Job> {
    return this.jobsService.update(id, dto);
  }

}
