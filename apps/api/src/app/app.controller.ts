import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return "Hello";
  }
}
