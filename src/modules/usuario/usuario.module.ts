import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioUseCase } from './usuario.usecase';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './usuario.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsuarioController],
  providers: [UsuarioUseCase, UsuarioService],
})
export class UsuarioModule {}
