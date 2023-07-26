import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('UNMSM-Services-API')
    .setDescription(
      'Documentación completa de las APIs para las Facultades y Dependencias de la UNMSM. Acceso fácil y detallado a la información académica y administrativa, desarrollada con NestJS',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};