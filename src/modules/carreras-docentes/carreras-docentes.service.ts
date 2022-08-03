import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarreraDocenteDto, EditCarreraDocenteDto } from './dtos';
import { CarreraDocente } from './entity';

@Injectable()
export class CarrerasDocentesService {
  constructor(
    @InjectRepository(CarreraDocente)
    private readonly carreraRepository: Repository<CarreraDocente>,
  ) {}

  async getById(id: number, carrera_docenteEntity?: CarreraDocente) {
    const carrera_docente = await this.carreraRepository
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
    // const carreraExiste = await this.carreraRepository.findOne({
    //   where: { nombre: dto.nombre },
    // });
    // if (carreraExiste)
    //   throw new BadRequestException('Carrera ya registrada con ese nombre');

    const nuevaCarreraDocente = this.carreraRepository.create(dto);
    const carrera_docente = await this.carreraRepository.save(
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
    return await this.carreraRepository.save(carreraEditado);
  }

  async deleteCarreraDocente(
    id: number,
    carrera_docenteEntity?: CarreraDocente,
  ) {
    const carrera_docente = await this.getById(id, carrera_docenteEntity);
    return await this.carreraRepository.remove(carrera_docente);
  }
}
