import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActaConsejo } from './entity';
import { Between, Repository } from 'typeorm';
import { map, Observable, from } from 'rxjs';
import { CreateActaConsejoDto } from './dtos/create-acta-consejo.dto';
import {
  fileFilterName,
  fileFilterVideo,
} from '../../helpers/fileFilerName.helpers';
import { InjectRepository } from '@nestjs/typeorm';
import { StorageService } from '../storage/storage.service';
import { EditActaConsejoDto } from './dtos/edit-acta-consejo.dto';

@Injectable()
export class ActasConsejoService {
  constructor(
    @InjectRepository(ActaConsejo)
    private readonly actaConsejoRepository: Repository<ActaConsejo>,
    private readonly storageService: StorageService,
  ) {}

  actasConsejoPorFacultad(
    slug: string,
    year?: number,
  ): Observable<ActaConsejo[]> {
    return from(
      this.actaConsejoRepository.find({
        order: { created_at: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          fecha: Between(new Date(year, 1, 1), new Date(year, 12, 31)),
          //   estado: true,
        },
      }),
    ).pipe(map((actaConsejo: ActaConsejo[]) => actaConsejo));
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

  async createActaConsejo(dto: CreateActaConsejoDto, file: any, video: any) {
    const hash = Date.now().toString();
    if (file) {
      const nombre_archivo = fileFilterName(file, hash);
      if (!nombre_archivo) {
        throw new BadRequestException('Archivo no válido imagen');
      }
      let { Location } = await this.storageService.uploadFile(
        file[0],
        nombre_archivo,
      );
      dto.documento = Location;
    }

    if (video) {
      const nombre_archivo = fileFilterVideo(video, hash);
      if (!nombre_archivo) {
        throw new BadRequestException('Archivo no válido video');
      }
      let { Location } = await this.storageService.uploadFile(
        video[0],
        nombre_archivo,
      );
      dto.video = Location;
    }

    const nuevaActaConsejo = this.actaConsejoRepository.create(dto);
    const actaConsejo = await this.actaConsejoRepository.save(nuevaActaConsejo);

    return { actaConsejo };
  }

  async editActaConsejo(
    id: number,
    dto: EditActaConsejoDto,
    file: any,
    video: any,
    actaConsejoEntity?: ActaConsejo,
  ) {
    const actaConsejo = await this.getById(id, actaConsejoEntity);
    if (actaConsejo.documento != '' && file) {
      if (file) {
        await this.storageService.deleteFile(actaConsejo.documento);
      }
    }

    if (actaConsejo.video != '' && video) {
      if (video) {
        await this.storageService.deleteFile(actaConsejo.video);
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

    if (video) {
      const hash = Date.now().toString();
      const nombre_documento = fileFilterVideo(video, hash);

      if (!nombre_documento) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        video,
        nombre_documento,
      );
      dto.video = Location;
    }

    const memoriaEditada = Object.assign(actaConsejo, dto);
    return await this.actaConsejoRepository.save(memoriaEditada);
  }

  async deleteActaConsejo(id: number, actaConsejoEntity?: ActaConsejo) {
    const actaConsejo = await this.getById(id, actaConsejoEntity);
    return await this.actaConsejoRepository.remove(actaConsejo);
  }
}
