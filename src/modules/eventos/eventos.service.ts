import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { Evento } from './entity/evento.entity';
import { CreateEventoDto, EditEventoDto } from './dto';
import { StorageService } from '../storage/storage.service';
import { generateSlug } from '../../helpers/generateSlug';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { EventoTipo } from './consts/EventoTipo';

export interface EventoFindOne {
  id?: number;
  titulo?: string;
}

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    private readonly storageService: StorageService,
  ) {}

  ultimosEventos(slug: string): Observable<Evento[]> {
    return from(
      this.eventoRepository.find({
        take: 3,
        order: { created_at: 'DESC' },
        where: {
          facultad: {
            slug,
          },
        },
      }),
    ).pipe(map((eventos: Evento[]) => eventos));
  }

  paginacionEventos(
    options: IPaginationOptions,
    slug: string,
    sort: string,
  ): Observable<Pagination<Evento>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    return from(
      this.eventoRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: ['id', 'titulo', 'estado'],
        where: {
          facultad: {
            slug,
          },
        },
      }),
    ).pipe(
      map(([eventos, totalEventos]) => {
        const eventosPageable: Pagination<Evento> = {
          items: eventos,
          meta: {
            currentPage: Number(options.page),
            itemCount: eventos.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalEventos,
            totalPages: Math.ceil(totalEventos / Number(options.limit)),
          },
        };
        return eventosPageable;
      }),
    );
  }

  async getById(id: number, eventoEntity?: Evento) {
    const evento = await this.eventoRepository
      .findOne({ where: { id } })
      .then((d) =>
        !eventoEntity ? d : !!d && eventoEntity.id === d.id ? d : null,
      );
    if (!evento)
      throw new NotFoundException('Evento no existe o no está autorizado');
    return evento;
  }

  async createEvento(dto: CreateEventoDto, file: any) {
    const hash = Date.now().toString();
    dto.slug = await generateSlug(dto.titulo, hash);
    if (file) {
      const nombre_foto = fileFilterName(file, hash);
      dto.foto = nombre_foto;
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.foto = Location;
    }
    const nuevoEvento = this.eventoRepository.create(dto);
    const evento = await this.eventoRepository.save(nuevoEvento);

    return { evento };
  }

  async editEvento(
    id: number,
    dto: EditEventoDto,
    file: any,
    eventoEntity?: Evento,
  ) {
    const evento = await this.getById(id, eventoEntity);
    if (evento.foto != '' && file) {
      await this.storageService.deleteFile(evento.foto);
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

    const eventoEditado = Object.assign(evento, dto);
    return await this.eventoRepository.save(eventoEditado);
  }

  async deleteEvento(id: number, eventoEntity?: Evento) {
    const evento = await this.getById(id, eventoEntity);
    return await this.eventoRepository.remove(evento);
  }

  async findOne(data: EventoFindOne) {
    return await this.eventoRepository
      .createQueryBuilder('evento')
      .where(data)
      .addSelect('evento.titulo')
      .getOne();
  }

  tipoEventos() {
    return Object.keys(EventoTipo).map((key) => ({
      value: key,
      label: EventoTipo[key],
    }));
  }
}
