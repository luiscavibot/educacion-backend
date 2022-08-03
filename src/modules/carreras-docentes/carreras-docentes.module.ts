import { Module } from '@nestjs/common';
import { CarrerasDocentesService } from './carreras-docentes.service';
import { CarrerasDocentesController } from './carreras-docentes.controller';
import { CarreraDocente } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarreraDocente])],
  providers: [CarrerasDocentesService],
  controllers: [CarrerasDocentesController],
})
export class CarrerasDocentesModule {}
