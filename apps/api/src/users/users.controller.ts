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
import {UsersService} from "./users.service";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";

@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @Roles('admin')
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.findAll(filterDto);
  }

  @Get('/:id')
  @Roles('admin')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  @Roles('admin')
  createUser(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }

  @Delete('/:id')
  @Roles('admin')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}

