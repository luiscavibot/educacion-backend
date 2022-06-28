import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { DocenteController } from './docente.controller';
import { Docente } from './docente.entity';
import { DocenteUseCase } from './docente.usecase';
import { DocenteService } from './docente.service';

@Module({
  imports: [SequelizeModule.forFeature([Docente])],
  providers: [DocenteUseCase, DocenteService],
  controllers: [DocenteController],
})
export class DocenteModule {}
