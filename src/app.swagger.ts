import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { json, urlencoded } from 'express';
import multer from 'multer';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('UNMSM-Services-API')
    .setDescription(
      'Esta es una API creada con NestJS para las facultades y dependencias de la UNMSM y está desplegada en AWS',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);
};
