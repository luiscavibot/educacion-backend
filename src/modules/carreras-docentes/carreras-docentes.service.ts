import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarreraDocenteDto, EditCarreraDocenteDto } from './dtos';
import { CarreraDocente } from './entity';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class CarrerasDocentesService {
  constructor(
    @InjectRepository(CarreraDocente)
    private readonly carreraDocenteRepository: Repository<CarreraDocente>,
  ) {}

  async getById(id: number, carrera_docenteEntity?: CarreraDocente) {
    const carrera_docente = await this.carreraDocenteRepository
      .findOne({ where: { id } })
      .then((d) =>
        !carrera_docenteEntity
          ? d
          : !!d && carrera_docenteEntity.id === d.id
          ? d
          : null,
      );
    if (!carrera_docente)
      throw new NotFoundException(
        'Carrera_docente no existe o no está autorizado',
      );
    return carrera_docente;
  }

  async createCarreraDocente(dto: CreateCarreraDocenteDto) {
    // const carreraExiste = await this.carreraDocenteRepository.findOne({
    //   where: { nombre: dto.nombre },
    // });
    // if (carreraExiste)
    //   throw new BadRequestException('Carrera ya registrada con ese nombre');

    const nuevaCarreraDocente = this.carreraDocenteRepository.create(dto);
    const carrera_docente = await this.carreraDocenteRepository.save(
      nuevaCarreraDocente,
    );

    return carrera_docente;
  }

  async editCarreraDocente(
    id: number,
    dto: EditCarreraDocenteDto,
    carrera_docenteEntity?: CarreraDocente,
  ) {
    const carrera_docente = await this.getById(id, carrera_docenteEntity);
    const carreraEditado = Object.assign(carrera_docente, dto);
    return await this.carreraDocenteRepository.save(carreraEditado);
  }

  async deleteCarreraDocente(
    id: number,
    carrera_docenteEntity?: CarreraDocente,
  ) {
    const carrera_docente = await this.getById(id, carrera_docenteEntity);
    return await this.carreraDocenteRepository.remove(carrera_docente);
  }
  directoresXCarrera(id: number): Observable<CarreraDocente[]> {
    return from(
      this.carreraDocenteRepository.find({
        where: {
          carreraId: id,
          director: true,
        },
      }),
    ).pipe(map((directorios: CarreraDocente[]) => directorios));
  }
}
