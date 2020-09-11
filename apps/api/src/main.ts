import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  const options = new DocumentBuilder()
    .setTitle('Evid Api')
    .setDescription('API for Evid application')
    .setVersion('0.1')
    .addServer('localhost:3333/api')
    .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix(globalPrefix);
  const port = process.env.API_PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
