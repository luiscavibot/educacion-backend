import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsignaturasCarrerasController } from './asignaturas-carreras.controller';
import { AsignaturasCarrerasService } from './asignaturas-carreras.service';
import { AsignaturaCarrera } from './entity/asignatura-carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsignaturaCarrera])],
  controllers: [AsignaturasCarrerasController],
  providers: [AsignaturasCarrerasService],
})
export class AsignaturasCarrerasModule {}
