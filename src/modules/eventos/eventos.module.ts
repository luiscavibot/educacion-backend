import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { Evento } from './entity';
import { EventosController } from './eventos.controller';
import { EventoService } from './eventos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  controllers: [EventosController],
  providers: [EventoService, StorageService],
})
export class EventosModule {}
