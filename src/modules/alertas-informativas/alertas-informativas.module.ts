import { Module } from '@nestjs/common';
import { AlertasInformativasService } from './alertas-informativas.service';
import { AlertasInformativasController } from './alertas-informativas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertaInformativa } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlertaInformativa])],
  providers: [AlertasInformativasService],
  controllers: [AlertasInformativasController]
})
export class AlertasInformativasModule {}
