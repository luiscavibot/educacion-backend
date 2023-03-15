import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertaAdmisionPosgradoController } from './alerta-admision-posgrado.controller';
import { AlertaAdmisionPosgradoService } from './alerta-admision-posgrado.service';
import { AlertaAdmisionPosgrado } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaAdmisionPosgrado])],
  controllers: [AlertaAdmisionPosgradoController],
  providers: [AlertaAdmisionPosgradoService]
})
export class AlertaAdmisionPosgradoModule {}
