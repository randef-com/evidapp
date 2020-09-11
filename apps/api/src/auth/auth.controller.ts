import {
  Controller,
  UseGuards,
  Post,
  Body, UnauthorizedException,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {CredentialsDto} from "./dto/credentials.dto";
import {EmployeesService} from "../employees/employees.service";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeesService: EmployeesService
  ) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() login: CredentialsDto) {
    const employee = await this.employeesService.findByEmail(login.email);
    if(!employee){
      throw new UnauthorizedException();
    }
    return await this.authService.login(employee);

  }
}
