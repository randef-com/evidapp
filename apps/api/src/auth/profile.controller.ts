import {
  Controller, Get,
  UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {GetUser} from "./decorators/get-user.decorator";
import {User} from "../users/user.entity";

@ApiTags('profile')
@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {

  @Get()
  public async profile(@GetUser() user: User): Promise<User> {
    return user;
  }
}
