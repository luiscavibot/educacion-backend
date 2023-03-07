import { Module } from '@nestjs/common';
import { ProgramasEspecialesService } from './programas-especiales.service';
import { ProgramasEspecialesController } from './programas-especiales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaEspecial } from './entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProgramaEspecial])],
  providers: [ProgramasEspecialesService],
  controllers: [ProgramasEspecialesController]
})
export class ProgramasEspecialesModule {}
