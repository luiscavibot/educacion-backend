import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocenteController } from './docentes.controller';
import { DocenteService } from './docentes.service';
import { Docente } from './entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocenteController],
  providers: [DocenteService, StorageService],
})
export class DocenteModule {}
