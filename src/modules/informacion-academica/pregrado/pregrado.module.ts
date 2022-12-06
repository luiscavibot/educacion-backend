import { Module } from '@nestjs/common';
import { PregradoService } from './pregrado.service';
import { PregradoController } from './pregrado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pregrado } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregrado])],
  providers: [PregradoService],
  controllers: [PregradoController]
})
export class PregradoModule {}
