import {
  Controller,
  UseGuards,
  Post,
  Body, ValidationPipe, UnauthorizedException,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {CredentialsDto} from "./dto/credentials.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
  }

  @Post('register')
  public async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() login: CredentialsDto) {
    const user = await this.usersService.findByEmail(login.email);
    if(!user){
      throw new UnauthorizedException();
    }
    return await this.authService.login(user);

  }
}
