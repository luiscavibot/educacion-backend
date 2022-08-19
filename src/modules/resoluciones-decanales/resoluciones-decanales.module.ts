import { Module } from '@nestjs/common';
import { ResolucionesDecanalesService } from './resoluciones-decanales.service';
import { ResolucionesDecanalesController } from './resoluciones-decanales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolucionDecanal } from './entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResolucionDecanal])],
  providers: [ResolucionesDecanalesService, StorageService],
  controllers: [ResolucionesDecanalesController],
})
export class ResolucionesDecanalesModule {}
