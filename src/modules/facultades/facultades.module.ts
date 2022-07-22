import { Module } from '@nestjs/common';
import { FacultadesController } from './facultades.controller';
import { FacultadesService } from './facultades.service';
import { Facultad } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Facultad])],
  controllers: [FacultadesController],
  providers: [FacultadesService],
})
export class FacultadesModule {}
