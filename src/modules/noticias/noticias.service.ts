import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticiaDto, EditNoticiaDto } from './dtos';
import { Noticia } from './entity/noticia.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { generateSlug } from '../../helpers/generateSlug';

export interface NoticiaFindOne {
  id?: number;
  titulo?: string;
}

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
    private readonly storageService: StorageService,
  ) {}

  ultimasNoticias(slug: string): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { fecha: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          destacado: false,
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  destacadasNoticias(slug: string): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { created_at: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          destacado: true,
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  paginacionNoticias(
    options: IPaginationOptions,
    slug: string,
  ): Observable<Pagination<Noticia>> {
    return from(
      this.noticiaRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { id: 'ASC' },
        select: ['id', 'titulo', 'estado'],
        where: {
          facultad: {
            slug,
          },
        },
      }),
    ).pipe(
      map(([noticias, totalNoticias]) => {
        const noticiasPageable: Pagination<Noticia> = {
          items: noticias,
          meta: {
            currentPage: Number(options.page),
            itemCount: noticias.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalNoticias,
            totalPages: Math.ceil(totalNoticias / Number(options.limit)),
          },
        };
        return noticiasPageable;
      }),
    );
  }

  async getById(id: number, noticiaEntity?: Noticia) {
    const noticia = await this.noticiaRepository
      .findOne({ where: { id } })
      .then((d) =>
        !noticiaEntity ? d : !!d && noticiaEntity.id === d.id ? d : null,
      );
    if (!noticia)
      throw new NotFoundException('Noticia no existe o no está autorizado');
    return noticia;
  }

  async createNoticia(dto: CreateNoticiaDto, file: any) {
    const hash = Date.now().toString();
    // const noticiaExiste = await this.noticiaRepository.findOne({
    //   where: { titulo: dto.titulo, fecha: dto.fecha },
    // });

    // if (noticiaExiste)
    //   throw new BadRequestException('Noticia ya registrada con ese nombre');

    dto.slug = await generateSlug(dto.titulo, hash);

    if (file) {
      const nombre_foto = fileFilterName(file, hash);
      dto.foto = nombre_foto;
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      await this.storageService.uploadFile(file, nombre_foto);
    }
    const nuevaNoticia = this.noticiaRepository.create(dto);
    const noticia = await this.noticiaRepository.save(nuevaNoticia);

    return { noticia };
  }

  async editNoticia(
    id: number,
    dto: EditNoticiaDto,
    file: any,
    noticiaEntity?: Noticia,
  ) {
    const noticia = await this.getById(id, noticiaEntity);
    if (noticia.foto != '' && file) {
      await this.storageService.deleteFile(noticia.foto);
    }

    if (file) {
      const hash = Date.now().toString();
      const nombre_foto = fileFilterName(file, hash);
      dto.foto = nombre_foto;
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      await this.storageService.uploadFile(file, nombre_foto);
    }

    const noticiaEditado = Object.assign(noticia, dto);
    return await this.noticiaRepository.save(noticiaEditado);
  }

  async deleteNoticia(id: number, noticiaEntity?: Noticia) {
    const noticia = await this.getById(id, noticiaEntity);
    return await this.noticiaRepository.remove(noticia);
  }

  async findOne(data: NoticiaFindOne) {
    return await this.noticiaRepository
      .createQueryBuilder('noticia')
      .where(data)
      .addSelect('noticia.titulo')
      .getOne();
  }
}
