import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './entity';
import { EventosController } from './eventos.controller';
import { EventoService } from './eventos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Evento])],
  controllers: [EventosController],
  providers: [EventoService],
})
export class EventosModule {}
