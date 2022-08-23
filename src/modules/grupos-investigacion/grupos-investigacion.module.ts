import { Module } from '@nestjs/common';
import { GruposInvestigacionController } from './grupos-investigacion.controller';
import { GruposInvestigacionService } from './grupos-investigacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoInvestigacion } from './entity/grupo-investigacion.entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoInvestigacion])],
  controllers: [GruposInvestigacionController],
  providers: [GruposInvestigacionService, StorageService],
})
export class GruposInvestigacionModule {}
