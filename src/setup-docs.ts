import { DocumentBuilder, SwaggerModule } from '@infinity-js/core';
import { INestApplication } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';

export const setupDocs = (app: INestApplication, port: number) => {
  const swaggerConfigBuilding = new DocumentBuilder()
    .setTitle('Lucienne')
    .setDescription('API documentation for Lucienne')
    .setVersion('1.0')
    .addTag('Users');

  if (process.env.NODE_ENV === 'development') {
    swaggerConfigBuilding.addServer(`http://localhost:${port}`);
  }

  const swaggerConfig = swaggerConfigBuilding.build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  writeFileSync(
    join(__dirname, '..', 'api-docs', 'lucienne.json'),
    JSON.stringify(swaggerDocument),
  );
};
