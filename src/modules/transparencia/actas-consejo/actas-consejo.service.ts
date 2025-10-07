import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActaConsejo } from './entity';
import {
  Repository,
  FindOptionsWhere,
  FindOptionsSelect,
  Like,
  Between,
} from 'typeorm';
import { map, Observable, from } from 'rxjs';
import { CreateActaConsejoDto } from './dtos/create-acta-consejo.dto';
import { fileFilterName } from '../../../helpers/fileFilerName.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from '../../storage/storage.service';
import { EditActaConsejoDto } from './dtos/edit-acta-consejo.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { SesionTipo } from './consts/SesionTipo';

@Injectable()
export class ActasConsejoService {
  constructor(
    @InjectRepository(ActaConsejo)
    private readonly actaConsejoRepository: Repository<ActaConsejo>,
    private readonly storageService: StorageService,
  ) {}

  paginacionActasConsejo(
    options: IPaginationOptions,
    slug: string,
    sort: string,
    estado: string,
    fecha_inicio: string,
    fecha_fin: string,
    query: string,
  ): Observable<Pagination<ActaConsejo>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<ActaConsejo>[] = [
      {
        user: { facultad: { slug } },
      },
    ];
    let _select: FindOptionsSelect<ActaConsejo> = {
      id: true,
      sesion: true,
      estado: true,
      fecha: true,
      palabras_claves: true,
    };

    if (estado == 'true') {
      _select = {
        id: true,
        sesion: true,
        descripcion: true,
        documento: true,
        video: true,
        fecha: true,
        palabras_claves: true,
      };
      _where = [{ user: { facultad: { slug } }, estado: true }];
    }
    if (query.length >= 1) {
      _where = [
        {
          user: { facultad: { slug } },
          estado: true,
          palabras_claves: Like(`%${query}%`),
        },
        {
          user: { facultad: { slug } },
          estado: true,
          descripcion: Like(`%${query}%`),
        },
      ];
    }

    if (fecha_inicio && fecha_fin) {
      _where = [
        {
          user: { facultad: { slug } },
          estado: true,
          palabras_claves: Like(`%${query}%`),
          fecha: Between(new Date(fecha_inicio), new Date(fecha_fin)),
        },
        {
          user: { facultad: { slug } },
          estado: true,
          descripcion: Like(`%${query}%`),
          fecha: Between(new Date(fecha_inicio), new Date(fecha_fin)),
        },
      ];
    }

    return from(
      this.actaConsejoRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
      }),
    ).pipe(
      map(([actasConsejo, totalActasConsejo]) => {
        const actasConsejoPageable: Pagination<ActaConsejo> = {
          items: actasConsejo,
          meta: {
            currentPage: Number(options.page),
            itemCount: actasConsejo.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalActasConsejo,
            totalPages: Math.ceil(totalActasConsejo / Number(options.limit)),
          },
        };
        return actasConsejoPageable;
      }),
    );
  }

  async getById(id: number, actaConsejoEntity?: ActaConsejo) {
    const actaConsejo = await this.actaConsejoRepository
      .findOne({ where: { id } })
      .then((d) =>
        !actaConsejoEntity
          ? d
          : !!d && actaConsejoEntity.id === d.id
          ? d
          : null,
      );
    if (!actaConsejo)
      throw new NotFoundException(
        'Acta consejo no existe o no está autorizado',
      );
    return actaConsejo;
  }

  async createActaConsejo(dto: CreateActaConsejoDto, file: any) {
    const hash = Date.now().toString();

    // Asignar last_updated_by con el mismo valor de usuario_id
    if (dto.usuario_id) {
      dto.last_updated_by = dto.usuario_id;
    }

    if (file) {
      const nombre_archivo = fileFilterName(file, hash);
      if (!nombre_archivo) {
        throw new BadRequestException('Archivo no válido imagen');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_archivo,
      );
      dto.documento = Location;
      dto.fileName = file.originalname;
    }

    const nuevaActaConsejo = this.actaConsejoRepository.create(dto);
    const actaConsejo = await this.actaConsejoRepository.save(nuevaActaConsejo);

    return { actaConsejo };
  }

  async editActaConsejo(
    id: number,
    dto: EditActaConsejoDto,
    file: any,
    actaConsejoEntity?: ActaConsejo,
  ) {
    const actaConsejo = await this.getById(id, actaConsejoEntity);
    if (actaConsejo.documento != '' && file) {
      if (file) {
        await this.storageService.deleteFile(actaConsejo.documento);
      }
    }

    if (file) {
      const hash = Date.now().toString();
      const nombre_documento = fileFilterName(file, hash);

      if (!nombre_documento) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_documento,
      );
      dto.documento = Location;
      dto.fileName = file.originalname;
    }

    // Si no se proporciona last_updated_by, mantener el valor actual
    if (!dto.last_updated_by) {
      dto.last_updated_by = actaConsejo.last_updated_by;
    }

    const memoriaEditada = Object.assign(actaConsejo, dto);
    return await this.actaConsejoRepository.save(memoriaEditada);
  }

  tipoSesion() {
    return Object.keys(SesionTipo).map((key) => ({
      value: key,
      label: SesionTipo[key],
    }));
  }

  async deleteActaConsejo(id: number, actaConsejoEntity?: ActaConsejo) {
    const actaConsejo = await this.getById(id, actaConsejoEntity);
    if (actaConsejo.documento != '') {
      await this.storageService.deleteFile(actaConsejo.documento);
    }
    return await this.actaConsejoRepository.remove(actaConsejo);
  }
}
