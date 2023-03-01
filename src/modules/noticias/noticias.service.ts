import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  Not,
  Repository,
} from 'typeorm';
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

  ultimasNoticiasHome(slug: string): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { fecha: 'DESC' },
        where: {
          user: { facultad: { slug } },
          destacado: false,
          estado: true,
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  ultimasNoticias(slug: string, id: number): Observable<Noticia[]> {
    let _where: FindOptionsWhere<Noticia> = {
      user: { facultad: { slug } },
      estado: true,
    };
    if(id){
      _where = { ..._where, id: Not(id)};
    }
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { fecha: 'DESC' },
        where: _where
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  destacadasNoticias(slug: string): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { created_at: 'DESC' },
        where: {
          user: { facultad: { slug } },
          destacado: true,
          estado: true,
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  getNoticiaBySlug(slug: string): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        order: { created_at: 'DESC' },
        where: {
          slug,
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  paginacionNoticias(
    options: IPaginationOptions,
    slug: string,
    sort: string,
    estado: string,
  ): Observable<Pagination<Noticia>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<Noticia> = {
      user: { facultad: { slug } },
    };
    let _select: FindOptionsSelect<Noticia> = {
      id: true,
      titulo: true,
      estado: true,
    };
    if (estado && estado == 'true') {
      _select = {
        ..._select,
        foto: true,
        pie_foto: true,
        fecha: true,
        cuerpo: true,
        resumen: true,
        slug: true,
      };
      _where = { ..._where, estado: true };
    }
    return from(
      this.noticiaRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
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

    dto.slug = await generateSlug(dto.titulo, hash);

    if (file) {
      const nombre_foto = fileFilterName(file, hash);
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.foto = Location;
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

      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.foto = Location;
    }

    const noticiaEditado = Object.assign(noticia, dto);
    return await this.noticiaRepository.save(noticiaEditado);
  }

  async deleteNoticia(id: number, noticiaEntity?: Noticia) {
    const noticia = await this.getById(id, noticiaEntity);
    if (noticia.foto != '') {
      await this.storageService.deleteFile(noticia.foto);
    }
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
