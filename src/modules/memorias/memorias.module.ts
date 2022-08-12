import { Module } from '@nestjs/common';
import { MemoriasController } from './memorias.controller';
import { MemoriasService } from './memorias.service';

@Module({
  controllers: [MemoriasController],
  providers: [MemoriasService]
})
export class MemoriasModule {}
