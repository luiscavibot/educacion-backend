import { Module } from '@nestjs/common';
import { DirigidosController } from './dirigidos.controller';
import { DirigidosService } from './dirigidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dirigido } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dirigido])],
  controllers: [DirigidosController],
  providers: [DirigidosService]
})
export class DirigidosModule {}
