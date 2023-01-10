import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, FindOptionsWhere, Repository, Like} from 'typeorm';
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
  ): Observable<Pagination<Tramite>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<Tramite>[] = [{
      facultad: { slug },
    }];
    let _select: FindOptionsSelect<Tramite> = {
      id: true,
      titulo: true,
      estado: true,
    };
    if (estado && estado == 'true') {
      _select = {
        ..._select,
        descripcion:true,
        dirigido:true,
        fecha: true,
        proceso: true,
        anexo: true,
        correo: true,
        requisitos: true,
        updated_at:true
      };
      _where = [{ facultad: { slug }, estado: true }];
    }

    if (tipos && tipos.length>0) {
      for(let idx = 0; idx< tipos.length; idx++){
        if(idx == 0){
          _where = [
            {facultad: { slug }, estado: true, dirigido: Like(`%${tipos[idx]}%`)}
          ]
        }
        if(idx>=1){
          _where = [
            ..._where,
            {facultad: { slug }, estado: true, dirigido: Like(`%${tipos[idx]}%`)}
          ]
        }

      }
    }

    if (query.length>=1) {
      _where = [
        {  facultad: { slug }, estado: true, titulo: Like(`%${query}%`) },
        {  facultad: { slug }, estado: true, descripcion: Like(`%${query}%`) },
      ]
    }
    return from(
      this.tramiteRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { id: 'ASC' },
        select: _select,
        where: _where
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
