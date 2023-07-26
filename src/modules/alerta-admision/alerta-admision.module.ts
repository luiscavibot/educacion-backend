import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertaAdmisionController } from './alerta-admision.controller';
import { AlertaAdmisionService } from './alerta-admision.service';
import { AlertaAdmision } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaAdmision])],
  controllers: [AlertaAdmisionController],
  providers: [AlertaAdmisionService]
})
export class AlertaAdmisionModule {}
