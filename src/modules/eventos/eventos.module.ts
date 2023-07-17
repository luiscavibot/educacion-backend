import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { Evento } from './entity';
import { EventosController } from './eventos.controller';
import { EventoService } from './eventos.service';
import { Adjunto } from '../adjuntos/entity';
import { AdjuntosService } from '../adjuntos/adjuntos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evento]), TypeOrmModule.forFeature([Adjunto]),],
  controllers: [EventosController],
  providers: [EventoService, StorageService, AdjuntosService],
})
export class EventosModule {}
