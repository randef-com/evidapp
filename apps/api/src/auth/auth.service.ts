import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {IToken} from "../../../../libs/api-interfaces/src/lib/token.interface";
import {EmployeesService} from "../employees/employees.service";
import {Employee} from "../employees/employee.entity";

@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService,
              private jwtService: JwtService) {
  }

  async login(employee: Employee): Promise<IToken> {
    const payload = {
      sub: employee.id,
      email: employee.email,
      firstname: employee.firstName,
      lastname: employee.lastName,
      roles: employee.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const employee = await this.employeesService.findByEmail(email);
    if (employee && await employee.comparePassword(pass)) {
      const {password, ...result} = employee;
      return result;
    }
    return null;
  }
}
