import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Memoria } from './entity';
import { Repository, Between } from 'typeorm';
import { StorageService } from '../storage/storage.service';
import { Observable, from, map } from 'rxjs';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { CreateMemoriaDto } from './dtos/create-memoria.dto';
import { EditMemoriaDto } from './dtos/edit-memoria.dto';

@Injectable()
export class MemoriasService {
  constructor(
    @InjectRepository(Memoria)
    private readonly memoriaRepository: Repository<Memoria>,
    private readonly storageService: StorageService,
  ) {}

  memoriaPorFacultad(slug: string, year?: number): Observable<Memoria[]> {
    return from(
      this.memoriaRepository.find({
        order: { created_at: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          fecha: Between(new Date(year, 1, 1), new Date(year, 12, 31)),
          estado: true,
        },
      }),
    ).pipe(map((memoria: Memoria[]) => memoria));
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
    }

    const memoriaEditada = Object.assign(memoria, dto);
    return await this.memoriaRepository.save(memoriaEditada);
  }

  async deleteMemoria(id: number, memoriaEntity?: Memoria) {
    const noticia = await this.getById(id, memoriaEntity);
    return await this.memoriaRepository.remove(noticia);
  }
}
