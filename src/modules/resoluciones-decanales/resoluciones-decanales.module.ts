import { Module } from '@nestjs/common';
import { ResolucionesDecanalesService } from './resoluciones-decanales.service';
import { ResolucionesDecanalesController } from './resoluciones-decanales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolucionDecanal } from './entity';

@Module({
  // imports: [TypeOrmModule.forFeature([ResolucionDecanal])],
  providers: [ResolucionesDecanalesService],
  controllers: [ResolucionesDecanalesController],
})
export class ResolucionesDecanalesModule {}
