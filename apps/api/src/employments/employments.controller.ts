import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes, ValidationPipe
} from '@nestjs/common';
import {Roles} from "../auth/decorators/roles.decorator";

import {DeleteResult} from "typeorm";
import {EmploymentsService} from "./employments.service";
import {GetEmploymentsFilterDto} from "./dto/get-employments-filter.dto";
import {Employment} from "./employment.entity";
import {CreateEmploymentDto} from "./dto/create-employment.dto";
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/guards/roles.guard";

@ApiTags('employments')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UsePipes(ValidationPipe)
@Controller('employments')
export class EmploymentsController {
  constructor(
    private readonly service: EmploymentsService,
  ) {}

  @Get()
  @Roles('admin')
  getEmployments(@Query() filterDto: GetEmploymentsFilterDto): Promise<Employment[]> {
    return this.service.findAll(filterDto);
  }

  @Get('/:id')
  @Roles('admin')
  getEmploymentById(@Param('id', ParseIntPipe) id: number): Promise<Employment> {
    return this.service.findById(id);
  }

  @Post()
  @Roles('admin')
  createEmployment(@Body(ValidationPipe) dto: CreateEmploymentDto): Promise<Employment> {
    return this.service.create(dto);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteEmployment(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.service.delete(id);
  }

  @Put('/:id')
  @Roles('admin')
  updateEmployment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateEmploymentDto
  ): Promise<Employment> {
    return this.service.update(id, dto);
  }

}
