import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adjunto } from './entity';
import { AdjuntosController } from './adjuntos.controller';
import { AdjuntosService } from './adjuntos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Adjunto])],
  controllers: [AdjuntosController],
  providers: [AdjuntosService]
})
export class AdjuntosModule {}
