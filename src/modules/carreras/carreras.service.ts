import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from './entity/carrera.entity';
import { CreateCarreraDto } from './dtos/create-carrera.dto';
import { EditCarreraDto } from './dtos/edit-carrera.dto';
import { from, map, Observable, of, switchMap } from 'rxjs';
import slugify from 'slugify';
import { StorageService } from '../storage/storage.service';
import { generateSlug } from '../../helpers/generateSlug';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';

export interface CarreraFindOne {
  id?: number;
  nombre?: string;
}

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
    private readonly storageService: StorageService,
  ) {}

  carrerasPorFacultad(
    slug: string,
    nombre: string,
    tipo: string,
  ): Observable<Carrera[]> {
    return from(
      this.carreraRepository.find({
        order: { created_at: 'ASC' },
        where: {
          facultad: {
            slug,
          },
          slug: nombre,
          tipo,
        },
      }),
    ).pipe(map((carreras: Carrera[]) => carreras));
  }

  async getMany() {
    return await this.carreraRepository.find();
  }

  async getById(id: number, carreraEntity?: Carrera) {
    const carrera = await this.carreraRepository
      .findOne({ where: { id } })
      .then((d) =>
        !carreraEntity ? d : !!d && carreraEntity.id === d.id ? d : null,
      );
    if (!carrera)
      throw new NotFoundException('Carrera no existe o no está autorizado');
    return carrera;
  }

  async createCarrera(dto: CreateCarreraDto, file: any) {
    const carreraExiste = await this.carreraRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (carreraExiste)
      throw new BadRequestException('Carrera ya registrada con ese nombre');

    const hash = Date.now().toString();

    dto.slug = await generateSlug(dto.nombre);

    if (file) {
      const nombre = fileFilterName(file, hash);
      dto.foto = nombre;
      if (!nombre) {
        throw new BadRequestException('Archivo no válido');
      }
      await this.storageService.uploadFile(file, nombre);
    }
    const nuevaCarrera = this.carreraRepository.create(dto);
    const carrera = await this.carreraRepository.save(nuevaCarrera);

    return carrera;
  }

  async editCarrera(id: number, dto: EditCarreraDto, carreraEntity?: Carrera) {
    const carrera = await this.getById(id, carreraEntity);
    const carreraEditado = Object.assign(carrera, dto);
    return await this.carreraRepository.save(carreraEditado);
  }

  async deleteCarrera(id: number, carreraEntity?: Carrera) {
    const carrera = await this.getById(id, carreraEntity);
    return await this.carreraRepository.remove(carrera);
  }

  async findOne(data: CarreraFindOne) {
    return await this.carreraRepository
      .createQueryBuilder('carrera')
      .where(data)
      .addSelect('carrera.nombre')
      .getOne();
  }
}
