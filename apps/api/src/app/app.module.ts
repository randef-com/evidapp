import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeOrmConfig} from "../../config/typeorm.config";
import {AuthModule} from "../auth/auth.module";
import {getMetadataArgsStorage} from "typeorm";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {TransformInterceptor} from "./transform.interceptor";
import {EmploymentsModule} from "../employments/employments.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    ...typeOrmConfig,
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
  }), AuthModule, EmploymentsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
