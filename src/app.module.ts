import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/database.config';
import { DocenteModule } from './modules/docentes/docentes.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AreasModule } from './modules/areas/areas.module';
import { FacultadesModule } from './modules/facultades/facultades.module';
import { NoticiasModule } from './modules/noticias/noticias.module';
import { EgresadosModule } from './modules/egresados/egresados.module';
import { CarrerasModule } from './modules/carreras/carreras.module';
import { StorageModule } from './modules/storage/storage.module';
import { EventosModule } from './modules/eventos/eventos.module';
import { CarrerasDocentesModule } from './modules/carreras-docentes/carreras-docentes.module';
import { AsignaturasModule } from './modules/asignaturas/asignaturas.module';
import { DirectoriosModule } from './modules/directorios/directorios.module';
import { TramitesModule } from './modules/tramites/tramites.module';
import { DocumentosOficialesModule } from './modules/documentos-oficiales/documentos-oficiales.module';
import { ActasConsejoModule } from './modules/actas-consejo/actas-consejo.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      // Implementar variables prod / dev
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,

      // ¿Validaciones? https://docs.nestjs.com/techniques/configuration
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),

      // Load database nameSpaces
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        // Extremos las configuraciones desde el servie
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),

    DocenteModule,

    AuthModule,

    UsersModule,
    // AccessControlModule.forRoles(roles),
    AuthModule,
    AreasModule,
    FacultadesModule,
    NoticiasModule,
    EgresadosModule,
    CarrerasModule,
    StorageModule,
    EventosModule,
    CarrerasDocentesModule,
    AsignaturasModule,
    DirectoriosModule,
    TramitesModule,
    DocumentosOficialesModule,
    ActasConsejoModule,
    // UserModule,
    // PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
