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
import {GetCompaniesFilterDto} from "./dto/get-companies-filter.dto";
import {Company} from "./company.entity";
import {CompaniesService} from "./companies.service";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {DeleteResult} from "typeorm";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('companies')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
  ) {}

  @Get()
  @Roles('admin')
  getCompanies(@Query() filterDto: GetCompaniesFilterDto): Promise<Company[]> {
    return this.companiesService.findAll(filterDto);
  }

  @Get('/:id')
  @Roles('admin')
  getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findById(id);
  }

  @Post()
  @Roles('admin')
  createCompany(@Body() dto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(dto);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteCompany(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.companiesService.delete(id);
  }

  @Put('/:id')
  @Roles('admin')
  updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCompanyDto
  ): Promise<Company> {
    return this.companiesService.update(id, dto);
  }

}
