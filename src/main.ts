import {
  HttpExceptionFilter,
  InfinityExceptionFilter,
} from '@infinity-js/nestjs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupDocs } from './setup-docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new InfinityExceptionFilter());

  const port = parseInt(process.env.HTTP_PORT) || 3000;
  setupDocs(app, port);

  await app.listen(3000);
}
bootstrap();
