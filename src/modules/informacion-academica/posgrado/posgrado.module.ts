import { Module } from '@nestjs/common';
import { PosgradoController } from './posgrado.controller';
import { PosgradoService } from './posgrado.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posgrado } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posgrado])],
  controllers: [PosgradoController],
  providers: [PosgradoService]
})
export class PosgradoModule {}
