import { Module } from '@nestjs/common';
import { PosgradoController } from './posgrado.controller';
import { PosgradoService } from './posgrado.service';

@Module({
  controllers: [PosgradoController],
  providers: [PosgradoService]
})
export class PosgradoModule {}
