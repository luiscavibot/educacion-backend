import { Module } from '@nestjs/common';
import { DepartamentoAcademicoController } from './departamento-academico.controller';
import { DepartamentoAcademicoService } from './departamento-academico.service';

@Module({
  controllers: [DepartamentoAcademicoController],
  providers: [DepartamentoAcademicoService]
})
export class DepartamentoAcademicoModule {}
