import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { CreateEgresadoDto, EditEgresadoDto } from './dtos';
import { Egresado } from './entity';

@Injectable()
export class EgresadosService {
  constructor(
    @InjectRepository(Egresado)
    private readonly egresadoRepository: Repository<Egresado>,
    private readonly storageService: StorageService,
  ) {}

  paginacionEgresado(
    options: IPaginationOptions,
    slug: string,
  ): Observable<Pagination<Egresado>> {
    return from(
      this.egresadoRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { id: 'ASC' },
        where: {
          facultad: {
            slug,
          },
        },
      }),
    ).pipe(
      map(([egresados, totalEgresados]) => {
        const egresadosPageable: Pagination<Egresado> = {
          items: egresados,
          meta: {
            currentPage: Number(options.page),
            itemCount: egresados.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalEgresados,
            totalPages: Math.ceil(totalEgresados / Number(options.limit)),
          },
        };
        return egresadosPageable;
      }),
    );
  }

  async getById(id: number, egresadoEntity?: Egresado) {
    const egresado = await this.egresadoRepository
      .findOne({ where: { id } })
      .then((d) =>
        !egresadoEntity ? d : !!d && egresadoEntity.id === d.id ? d : null,
      );
    if (!egresado)
      throw new NotFoundException('Egresado no existe o no está autorizado');
    return egresado;
  }

  async createEgresado(dto: CreateEgresadoDto, file: any) {
    const egresadoExiste = await this.egresadoRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (egresadoExiste)
      throw new BadRequestException('Egresado ya registrado con ese nombre');

    const nuevoEgresado = this.egresadoRepository.create(dto);
    const egresado = await this.egresadoRepository.save(nuevoEgresado);
    // if (file) {
    //   await this.storageService.uploadFile(file);
    // }

    return { egresado };
  }

  async editEgresado(
    id: number,
    dto: EditEgresadoDto,
    file: any,
    egresadoEntity?: Egresado,
  ) {
    const egresado = await this.getById(id, egresadoEntity);
    if (egresado.foto != '' && file) {
      await this.storageService.deleteFile(egresado.foto);
    }
    // if (file) {
    //   await this.storageService.uploadFile(file);
    // }
    const egresadoEditado = Object.assign(egresado, dto);
    return await this.egresadoRepository.save(egresadoEditado);
  }

  async deleteEgresado(id: number, egresadoEntity?: Egresado) {
    const egresado = await this.getById(id, egresadoEntity);
    return await this.egresadoRepository.remove(egresado);
  }
}
