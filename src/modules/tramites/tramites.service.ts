import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
  Like,
  In,
} from 'typeorm';
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
    const nuevoTramite = this.tramiteRepository.create(dto);
    const tramite = await this.tramiteRepository.save(nuevoTramite);

    return { tramite };
  }

  paginacionTramites(
    options: IPaginationOptions,
    slug: string,
    sort: string,
    estado: string,
    tipos: string[],
    query: string,
    targetProject: string,
  ): Observable<Pagination<Tramite>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<Tramite>[] = [
      {
        user: { facultad: { slug } },
      },
    ];
    let _select: FindOptionsSelect<Tramite> = {
      id: true,
      titulo: true,
      estado: true,
    };
    if (estado) {
      _select = {
        ..._select,
        descripcion: true,
        dirigido: true,
        fecha: true,
        proceso: true,
        anexo: true,
        correo: true,
        fijar: true,
        requisitos: true,
        updated_at: true,
      };
      _where = [
        {
          user: { facultad: { slug } },
          estado: true,
          target_project: In(['ALL', targetProject]),
        },
      ];
    }

    if (tipos?.length > 0) _where = [];

    tipos?.forEach((tipo) => {
      _where = [
        ..._where,
        {
          user: { facultad: { slug } },
          estado: true,
          dirigido: Like(`%${tipo}%`),
          target_project: In(['ALL', targetProject]),
        },
      ];
    });

    if (query?.length > 0) {
      const firstGroupWhere = _where.map((where) => ({
        ...where,
        titulo: Like(`%${query}%`),
      }));
      const secondGroupWhere = _where.map((where) => ({
        ...where,
        descripcion: Like(`%${query}%`),
      }));
      _where = [...firstGroupWhere, ...secondGroupWhere];
    }

    // if (targetProject) {
    //   _where = [
    //     ..._where,
    //     {
    //       target_project: In(['ALL', targetProject]),
    //     },
    //   ];
    // }

    return from(
      this.tramiteRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
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
