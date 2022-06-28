import { Module } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { PerfilController } from './perfil.controller';
import { Perfil } from './perfil.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PerfilUseCase } from './perfil.usecase';

@Module({
  imports: [SequelizeModule.forFeature([Perfil])],
  providers: [PerfilUseCase, PerfilService],
  controllers: [PerfilController],
})
export class PerfilModule {}
