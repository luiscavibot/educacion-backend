import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocenteController } from './docente.controller';
import { DocenteService } from './docente.service';
import { Docente } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Docente])],
  controllers: [DocenteController],
  providers: [DocenteService],
})
export class DocenteModule {}
