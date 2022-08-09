import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTramiteDto, EditTramiteDto } from './dtos';
import { Tramite } from './entity';
import { from, map, Observable } from 'rxjs';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class TramitesService {
  constructor(
    @InjectRepository(Tramite)
    private readonly tramiteRepository: Repository<Tramite>,
  ) {}

  async getById(id: number, tramiteEntity?: Tramite) {
    const tramite = await this.tramiteRepository
      .findOne({ where: { id } })
      .then((d) =>
        !tramiteEntity ? d : !!d && tramiteEntity.id === d.id ? d : null,
      );
    if (!tramite)
      throw new NotFoundException('Tramite no existe o no está autorizado');
    return tramite;
  }

  async createTramite(dto: CreateTramiteDto) {
    const tramiteExiste = await this.tramiteRepository.findOne({
      where: { titulo: dto.titulo },
    });
    if (tramiteExiste)
      throw new BadRequestException('Tramite ya registrado con ese nombre');

    const nuevoTramite = this.tramiteRepository.create(dto);
    const tramite = await this.tramiteRepository.save(nuevoTramite);

    return { tramite };
  }

  paginacionTramites(
    options: IPaginationOptions,
    slug: string,
  ): Observable<Pagination<Tramite>> {
    return from(
      this.tramiteRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { id: 'ASC' },
        select: ['id', 'titulo', 'descripcion'],
        where: {
          facultad: {
            slug,
          },
          estado: true,
        },
      }),
    ).pipe(
      map(([tramites, totalTramites]) => {
        const tramitesPageable: Pagination<Tramite> = {
          items: tramites,
          meta: {
            currentPage: Number(options.page),
            itemCount: tramites.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalTramites,
            totalPages: Math.ceil(totalTramites / Number(options.limit)),
          },
        };
        return tramitesPageable;
      }),
    );
  }

  async editTramite(id: number, dto: EditTramiteDto, tramiteEntity?: Tramite) {
    const tramite = await this.getById(id, tramiteEntity);
    const tramiteEditado = Object.assign(tramite, dto);
    return await this.tramiteRepository.save(tramiteEditado);
  }

  async deleteTramite(id: number, tramiteEntity?: Tramite) {
    const tramite = await this.getById(id, tramiteEntity);
    return await this.tramiteRepository.remove(tramite);
  }
}
