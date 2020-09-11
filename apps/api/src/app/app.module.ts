import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConsoleModule} from 'nestjs-console';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from "../../config/typeorm.config";
import {AuthModule} from "../auth/auth.module";
import {getMetadataArgsStorage} from "typeorm";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {TransformInterceptor} from "./transform.interceptor";
import {EmploymentsModule} from "../employments/employments.module";
import {ConfigModule} from "@nestjs/config";
import * as Joi from "@hapi/joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      })
    }),
    TypeOrmModule.forRoot({
      ...typeOrmConfig,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }), AuthModule, EmploymentsModule, ConsoleModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {
}
