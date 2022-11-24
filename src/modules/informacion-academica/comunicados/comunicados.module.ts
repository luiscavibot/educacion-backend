import { Module } from '@nestjs/common';
import { ComunicadosController } from './comunicados.controller';
import { ComunicadosService } from './comunicados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comunicado } from './entity';
import { StorageService } from '../../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comunicado])],
  controllers: [ComunicadosController],
  providers: [ComunicadosService, StorageService]
})
export class ComunicadosModule {}
