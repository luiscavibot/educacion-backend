import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { Noticia } from './entity/noticia.entity';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { Adjunto } from '../adjuntos/entity';
import { AdjuntosService } from '../adjuntos/adjuntos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia]), TypeOrmModule.forFeature([Adjunto])],
  controllers: [NoticiasController],
  providers: [NoticiasService, StorageService, AdjuntosService  ],
})
export class NoticiasModule {}
