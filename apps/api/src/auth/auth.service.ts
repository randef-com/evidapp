import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {IRegistrationStatus} from "../../../../libs/api-interfaces/src/lib/registration-status.interface";
import {User} from "../users/user.entity";
import {JwtService} from '@nestjs/jwt';
import {IToken} from "../../../../libs/api-interfaces/src/lib/token.interface";


@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async register(user: CreateUserDto) {
    let status: IRegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      status = {success: false, message: err};
    }
    return status;
  }

  async login(user: User): Promise<IToken> {
    const payload = {
      sub: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
      roles: user.roles
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await user.comparePassword(pass)) {
      const {password, ...result} = user;
      return result;
    }
    return null;
  }
}
