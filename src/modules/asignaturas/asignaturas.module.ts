import { Module } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { AsignaturasController } from './asignaturas.controller';
import { Asignatura } from './entity/asignatura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Asignatura])],
  providers: [AsignaturasService],
  controllers: [AsignaturasController],
})
export class AsignaturasModule {}
