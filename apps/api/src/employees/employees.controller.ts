import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe, Post, Query,
  UseGuards, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {DeleteResult} from "typeorm";
import {EmployeesService} from "./employees.service";
import {GetEmployeesFilterDto} from "./dto/get-employees-filter.dto";
import {Employee} from "./employee.entity";
import {CreateEmployeeDto} from "./dto/create-employee.dto";

@ApiTags('employees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UsePipes(ValidationPipe)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
  ) {}

  @Get()
  @Roles('admin')
  getEmployees(@Query() filterDto: GetEmployeesFilterDto): Promise<Employee[]> {
    return this.employeesService.findAll(filterDto);
  }

  @Get('/:id')
  @Roles('admin')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeesService.findById(id);
  }

  @Post()
  @Roles('admin')
  createUser(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.create(dto);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.employeesService.delete(id);
  }
}

