import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolucionDecanal } from './entity/resolucion-decanal.entity';
import {
  Between,
  Like,
  Repository,
  FindOptionsWhere,
  FindOptionsSelect,
} from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { from, map, Observable } from 'rxjs';
import { CreateResolucionDecanalDto } from './dtos/create-resolucion-decanal.dto';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { EditResolucionDecanalDto } from './dtos';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ResolucionesDecanalesService {
  constructor(
    @InjectRepository(ResolucionDecanal)
    private readonly resolucionDecanalRepository: Repository<ResolucionDecanal>,
    private readonly storageService: StorageService,
  ) {}

  paginacionResolucionesDecanales(
    options: IPaginationOptions,
    slug: string,
    estado?: string,
    sort?: string,
  ): Observable<Pagination<ResolucionDecanal>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<ResolucionDecanal> = {
      facultad: { slug },
    };
    let _select: FindOptionsSelect<ResolucionDecanal> = {
      id: true,
      nombre: true,
      estado: true,
      descripcion: true,
    };
    if (estado == 'true') {
      _select = {
        id: true,
        nombre: true,
        descripcion: true,
        documento: true,
        fecha: true,
      };
      _where = { ..._where, estado: true };
    }

    return from(
      this.resolucionDecanalRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
      }),
    ).pipe(
      map(([resolucionDecanal, totalResolucionDecanal]) => {
        const resolucionDecanalPageable: Pagination<ResolucionDecanal> = {
          items: resolucionDecanal,
          meta: {
            currentPage: Number(options.page),
            itemCount: resolucionDecanal.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalResolucionDecanal,
            totalPages: Math.ceil(
              totalResolucionDecanal / Number(options.limit),
            ),
          },
        };
        return resolucionDecanalPageable;
      }),
    );
  }

  async getById(id: number, resolucionDecanalEntity?: ResolucionDecanal) {
    const resolucionDecanal = await this.resolucionDecanalRepository
      .findOne({ where: { id } })
      .then((d) =>
        !resolucionDecanalEntity
          ? d
          : !!d && resolucionDecanalEntity.id === d.id
          ? d
          : null,
      );
    if (!resolucionDecanal)
      throw new NotFoundException(
        'Resolucion decanal no existe o no está autorizado',
      );
    return resolucionDecanal;
  }

  async createResolucionDecanal(dto: CreateResolucionDecanalDto, file: any) {
    const hash = Date.now().toString();

    if (file) {
      const nombre_archivo = fileFilterName(file, hash);
      if (!nombre_archivo) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_archivo,
      );
      dto.documento = Location;
      dto.fileName = file.originalname;
    }
    const nuevaResolucionDecanal = this.resolucionDecanalRepository.create(dto);
    const resolucionDecanal = await this.resolucionDecanalRepository.save(
      nuevaResolucionDecanal,
    );

    return { resolucionDecanal };
  }

  async editResolucionDecanal(
    id: number,
    dto: EditResolucionDecanalDto,
    file: any,
    resolucionDecanalEntity?: ResolucionDecanal,
  ) {
    const resolucionDecanal = await this.getById(id, resolucionDecanalEntity);
    if (resolucionDecanal.documento != '' && file) {
      if (file) {
        await this.storageService.deleteFile(resolucionDecanal.documento);
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

    const resolucionDecanalEditado = Object.assign(resolucionDecanal, dto);
    return await this.resolucionDecanalRepository.save(
      resolucionDecanalEditado,
    );
  }

  async deleteResolucionDecanal(
    id: number,
    resolucionDecanalEntity?: ResolucionDecanal,
  ) {
    const resolucionDecanal = await this.getById(id, resolucionDecanalEntity);
    if (resolucionDecanal.documento != '') {
      await this.storageService.deleteFile(resolucionDecanal.documento);
    }
    return await this.resolucionDecanalRepository.remove(resolucionDecanal);
  }
}
