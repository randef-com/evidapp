import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HolidaysRepository} from "./holidays.repository";

@Module({
  imports: [TypeOrmModule.forFeature([HolidaysRepository])],
  providers: [HolidaysService],
  exports: [HolidaysService]
})
export class HolidaysModule {}
