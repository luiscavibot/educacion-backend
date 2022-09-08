import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memoria } from './entity';
import {
  Repository,
  Between,
  FindOptionsWhere,
  FindOptionsSelect,
  Like,
} from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { Observable, from, map } from 'rxjs';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { CreateMemoriaDto } from './dtos/create-memoria.dto';
import { EditMemoriaDto } from './dtos/edit-memoria.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MemoriasService {
  constructor(
    @InjectRepository(Memoria)
    private readonly memoriaRepository: Repository<Memoria>,
    private readonly storageService: StorageService,
  ) {}

  paginacionMemoria(
    options: IPaginationOptions,
    slug: string,
    estado?: string,
    sort?: string,
    query?: string,
  ): Observable<Pagination<Memoria>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<Memoria> = {
      facultad: { slug },
    };
    let _select: FindOptionsSelect<Memoria> = {
      id: true,
      nombre: true,
      descripcion: true,
      estado: true,
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

    if (query) {
      _where = { ..._where, nombre: Like(`%${query}%`) };
    }

    return from(
      this.memoriaRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
      }),
    ).pipe(
      map(([memorias, totalMemorias]) => {
        const memoriasPageable: Pagination<Memoria> = {
          items: memorias,
          meta: {
            currentPage: Number(options.page),
            itemCount: memorias.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalMemorias,
            totalPages: Math.ceil(totalMemorias / Number(options.limit)),
          },
        };
        return memoriasPageable;
      }),
    );
  }

  async getById(id: number, memoriaEntity?: Memoria) {
    const memoria = await this.memoriaRepository
      .findOne({ where: { id } })
      .then((d) =>
        !memoriaEntity ? d : !!d && memoriaEntity.id === d.id ? d : null,
      );
    if (!memoria)
      throw new NotFoundException(
        'Resolucion decanal no existe o no está autorizado',
      );
    return memoria;
  }

  async createMemoria(dto: CreateMemoriaDto, file: any) {
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
    const nuevaMemoria = this.memoriaRepository.create(dto);
    const memoria = await this.memoriaRepository.save(nuevaMemoria);

    return { memoria };
  }

  async editMemoria(
    id: number,
    dto: EditMemoriaDto,
    file: any,
    memoriaEntity?: Memoria,
  ) {
    const memoria = await this.getById(id, memoriaEntity);
    if (memoria.documento != '' && file) {
      if (file) {
        await this.storageService.deleteFile(memoria.documento);
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

    const memoriaEditada = Object.assign(memoria, dto);
    return await this.memoriaRepository.save(memoriaEditada);
  }

  async deleteMemoria(id: number, memoriaEntity?: Memoria) {
    const memoria = await this.getById(id, memoriaEntity);
    return await this.memoriaRepository.remove(memoria);
  }
}
