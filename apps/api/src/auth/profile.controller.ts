import {
  Controller, Get,
  UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {GetUser} from "./decorators/get-user.decorator";
import {Employee} from "../employees/employee.entity";

@ApiTags('profile')
@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {

  @Get()
  public async profile(@GetUser() user: Employee): Promise<Employee> {
    return user;
  }
}
