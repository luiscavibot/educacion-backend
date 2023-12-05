import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  In,
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
import { CreateAdjuntoDto } from '../adjuntos/dtos';
import { AdjuntosService } from '../adjuntos/adjuntos.service';

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
    private readonly adjuntoService: AdjuntosService,
  ) {}

  ultimasNoticiasHome(
    slug: string,
    targetProject: string,
  ): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { fecha: 'DESC' },
        where: {
          user: { facultad: { slug } },
          destacado: false,
          estado: true,
          target_project: In(['ALL', targetProject]),
        },
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  ultimasNoticias(slug: string, id: number): Observable<Noticia[]> {
    let _where: FindOptionsWhere<Noticia> = {
      user: { facultad: { slug } },
      estado: true,
    };
    if (id) {
      _where = { ..._where, id: Not(id) };
    }
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { fecha: 'DESC' },
        where: _where,
      }),
    ).pipe(map((noticias: Noticia[]) => noticias));
  }

  destacadasNoticias(
    slug: string,
    targetProject: string,
  ): Observable<Noticia[]> {
    return from(
      this.noticiaRepository.find({
        take: 3,
        order: { created_at: 'DESC' },
        where: {
          user: { facultad: { slug } },
          destacado: true,
          estado: true,
          target_project: In(['ALL', targetProject]),
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
    targetProject: string,
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
        target_project: true,
      };
      _where = { ..._where, estado: true };
    }
    if (targetProject) {
      _where = {
        ..._where,
        target_project: In(['ALL', targetProject]),
      };
    }
    // else {
    //   _where = {
    //     ..._where,
    //     target_project: 'ALL',
    //   };
    // }
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
      .findOne({ where: { id }, relations: ['adjuntos'] })
      .then((d) =>
        !noticiaEntity ? d : !!d && noticiaEntity.id === d.id ? d : null,
      );
    if (!noticia)
      throw new NotFoundException('Noticia no existe o no está autorizado');
    return noticia;
  }

  async createNoticia(
    dto: CreateNoticiaDto,
    file: any,
    adjuntos: CreateAdjuntoDto[],
  ) {
    const hash = Date.now().toString();
    let nuevosAdjuntos = {};
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
    if (adjuntos && adjuntos.length > 0) {
      nuevosAdjuntos = await Promise.all(
        adjuntos.map(async (adjuntoDto) => {
          const { adjunto, ...campos } =
            await this.adjuntoService.createAdjunto({
              ...adjuntoDto,
              noticia_id: noticia.id,
            });
          return campos;
        }),
      );
    }
    return { noticia, nuevosAdjuntos };
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

    if (noticia.adjuntos.length > 0) {
      for (const adjunto of noticia.adjuntos) {
        await this.adjuntoService.deleteAdjunto(adjunto.id);
      }
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
