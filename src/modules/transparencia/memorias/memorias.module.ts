import { Module } from '@nestjs/common';
import { MemoriasController } from './memorias.controller';
import { MemoriasService } from './memorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memoria } from './entity/memoria.entity';
import { StorageService } from '../../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memoria])],
  controllers: [MemoriasController],
  providers: [MemoriasService, StorageService],
})
export class MemoriasModule {}
