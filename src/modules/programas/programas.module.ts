import { Module } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programa } from './entity';
import { StorageService } from '../storage/storage.service';
import { ProgramasController } from './programas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Programa])],
  controllers: [ProgramasController],
  providers: [ProgramasService, StorageService]
})
export class ProgramasModule {}
