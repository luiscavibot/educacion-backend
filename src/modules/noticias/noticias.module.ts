import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './entity/noticia.entity';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia])],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}