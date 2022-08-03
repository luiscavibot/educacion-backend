import { Module } from '@nestjs/common';
import { EgresadosService } from './egresados.service';
import { EgresadosController } from './egresados.controller';
import { Egresado } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Egresado])],
  providers: [EgresadosService, StorageService],
  controllers: [EgresadosController],
})
export class EgresadosModule {}
