import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // global prefix
  initSwagger(app);
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
