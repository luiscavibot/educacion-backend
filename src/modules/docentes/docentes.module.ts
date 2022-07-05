import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocenteController } from './docentes.controller';
import { DocenteService } from './docentes.service';
import { Docente } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule {}
