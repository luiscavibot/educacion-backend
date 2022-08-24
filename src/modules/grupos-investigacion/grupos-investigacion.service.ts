import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GrupoInvestigacion } from './entity/grupo-investigacion.entity';
import { StorageService } from '../storage/storage.service';
import { Like, Repository } from 'typeorm';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { CreateGrupoInvestigacionDto, EditGrupoInvestigacionDto } from './dtos';
import { map, Observable, from } from 'rxjs';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class GruposInvestigacionService {
  constructor(
    @InjectRepository(GrupoInvestigacion)
    private readonly grupoInvestigacionRepository: Repository<GrupoInvestigacion>,
    private readonly storageService: StorageService,
  ) {}

  async getById(id: number, grupoInvestigacionEntity?: GrupoInvestigacion) {
    const grupoInvestigacion = await this.grupoInvestigacionRepository
      .findOne({ where: { id } })
      .then((d) =>
        !grupoInvestigacionEntity
          ? d
          : !!d && grupoInvestigacionEntity.id === d.id
          ? d
          : null,
      );
    if (!grupoInvestigacion)
      throw new NotFoundException(
        'GrupoInvestigacion no existe o no está autorizado',
      );
    return grupoInvestigacion;
  }
  async createGrupoInvestigacion(dto: CreateGrupoInvestigacionDto, file: any) {
    const grupoInvestigacionExiste =
      await this.grupoInvestigacionRepository.findOne({
        where: { nombre: dto.nombre },
      });

    if (grupoInvestigacionExiste)
      throw new BadRequestException(
        'GrupoInvestigacion ya registrado con ese nombre',
      );

    const hash = Date.now().toString();

    if (file) {
      const nombre_foto = fileFilterName(file, hash);
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.resolucion = Location;
    }

    const nuevoGrupoInvestigacion =
      this.grupoInvestigacionRepository.create(dto);
    const grupoInvestigacion = await this.grupoInvestigacionRepository.save(
      nuevoGrupoInvestigacion,
    );

    return grupoInvestigacion;
  }

  async editGrupoInvestigacion(
    id: number,
    dto: EditGrupoInvestigacionDto,
    file: any,
    grupoInvestigacionEntity?: GrupoInvestigacion,
  ) {
    const grupoInvestigacion = await this.getById(id, grupoInvestigacionEntity);
    if (grupoInvestigacion.resolucion != '' && file) {
      await this.storageService.deleteFile(grupoInvestigacion.resolucion);
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
      dto.resolucion = Location;
    }

    const grupoInvestigacionEditado = Object.assign(grupoInvestigacion, dto);
    return await this.grupoInvestigacionRepository.save(
      grupoInvestigacionEditado,
    );
  }

  async deleteGrupoInvestigacion(
    id: number,
    grupoInvestigacionEntity?: GrupoInvestigacion,
  ) {
    const grupoInvestigacion = await this.getById(id, grupoInvestigacionEntity);
    return await this.grupoInvestigacionRepository.remove(grupoInvestigacion);
  }

  paginacionGruposInvestigacion(
    options: IPaginationOptions,
    slug: string,
    query: string,
  ): Observable<Pagination<GrupoInvestigacion>> {
    return from(
      this.grupoInvestigacionRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        // order: { [order_by]: direction },
        // select: ['id', 'titulo', 'estado'],
        where: {
          facultad: {
            slug,
          },
          nombre: Like(`%${query}%`),
        },
      }),
    ).pipe(
      map(([gruposInvestigacion, totalGruposInvestigacion]) => {
        const gruposInvestigacionPageable: Pagination<GrupoInvestigacion> = {
          items: gruposInvestigacion,
          meta: {
            currentPage: Number(options.page),
            itemCount: gruposInvestigacion.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalGruposInvestigacion,
            totalPages: Math.ceil(
              totalGruposInvestigacion / Number(options.limit),
            ),
          },
        };
        return gruposInvestigacionPageable;
      }),
    );
  }
}
