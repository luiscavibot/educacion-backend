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
import { DocumentosOficialesModule } from './modules/transparencia/documentos-oficiales/documentos-oficiales.module';
import { ActasConsejoModule } from './modules/transparencia/actas-consejo/actas-consejo.module';
import { ResolucionesDecanalesModule } from './modules/transparencia/resoluciones-decanales/resoluciones-decanales.module';
import { MemoriasModule } from './modules/transparencia/memorias/memorias.module';
import { GruposInvestigacionModule } from './modules/grupos-investigacion/grupos-investigacion.module';
import { EnlacesInteresModule } from './modules/enlaces-interes/enlaces-interes.module';
import { DepartamentoAcademicoModule } from './modules/informacion-academica/departamento-academico/departamento-academico.module';
import { ComunicadosModule } from './modules/informacion-academica/comunicados/comunicados.module';
import { PregradoModule } from './modules/informacion-academica/pregrado/pregrado.module';
import { PosgradoModule } from './modules/informacion-academica/posgrado/posgrado.module';
import { ProgramasModule } from './modules/programas/programas.module';
import { DirigidosModule } from './modules/dirigidos/dirigidos.module';
import { AlertasInformativasModule } from './modules/alertas-informativas/alertas-informativas.module';
import { ProgramasEspecialesModule } from './modules/informacion-academica/programas-especiales/programas-especiales.module';
import { AlertaAdmisionModule } from './modules/alerta-admision/alerta-admision.module';
import { FilesModule } from './modules/files/files.module';
import { FileRelatedMorphModule } from './modules/files-related-morphs/files-related-morphs.module';
import { AdjuntosModule } from './modules/adjuntos/adjuntos.module';
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



    // AccessControlModule.forRoles(roles),
    ActasConsejoModule,
    AdjuntosModule,
    AlertaAdmisionModule,
    AlertasInformativasModule,
    AreasModule,
    AsignaturasModule,
    AuthModule,
    CarrerasDocentesModule,
    CarrerasModule,
    ComunicadosModule,
    DepartamentoAcademicoModule,
    DirectoriosModule,
    DirigidosModule,
    DocenteModule,
    DocumentosOficialesModule,
    EgresadosModule,
    EnlacesInteresModule,
    EventosModule,
    FacultadesModule,
    FileRelatedMorphModule,
    FilesModule,
    GruposInvestigacionModule,
    MemoriasModule,
    NoticiasModule,
    PosgradoModule,
    PregradoModule,
    ProgramasEspecialesModule,
    ProgramasModule,
    ResolucionesDecanalesModule,
    StorageModule,
    TramitesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
