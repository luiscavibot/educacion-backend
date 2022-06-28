import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DocenteModule } from './modules/docente/docente.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { PerfilModule } from './modules/perfil/perfil.module';

@Module({
  imports: [
    SequelizeModule.forRoot(configService.getSequelizeConfig()),
    DocenteModule,
    UsuarioModule,
    PerfilModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
