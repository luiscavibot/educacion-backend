import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResolucionDecanal } from './entity/resolucion-decanal.entity';
import { Between, Like, Repository } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { from, map, Observable } from 'rxjs';
import { CreateResolucionDecanalDto } from './dtos/create-resolucion-decanal.dto';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { EditResolucionDecanalDto } from './dtos';

@Injectable()
export class ResolucionesDecanalesService {
  constructor(
    @InjectRepository(ResolucionDecanal)
    private readonly resolucionDecanalRepository: Repository<ResolucionDecanal>,
    private readonly storageService: StorageService,
  ) {}

  resolucionDecanalPorFacultad(
    slug: string,
    year?: number,
  ): Observable<ResolucionDecanal[]> {
    return from(
      this.resolucionDecanalRepository.find({
        order: { created_at: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          fecha: Between(new Date(year, 1, 1), new Date(year, 12, 31)),
          estado: true,
        },
      }),
    ).pipe(map((resolucionDecanal: ResolucionDecanal[]) => resolucionDecanal));
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
    return await this.resolucionDecanalRepository.remove(resolucionDecanal);
  }
}
