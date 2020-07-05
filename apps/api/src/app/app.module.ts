import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeOrmConfig} from "../../config/typeorm.config";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {getMetadataArgsStorage} from "typeorm";
import {CompaniesModule} from "../companies/companies.module";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {TransformInterceptor} from "./transform.interceptor";
import {JobsModule} from "../jobs/jobs.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
  }), AuthModule, UsersModule, CompaniesModule, JobsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
