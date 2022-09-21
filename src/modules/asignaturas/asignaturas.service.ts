import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entity/asignatura.entity';
import { Repository } from 'typeorm';
import { EditAsignaturaDto } from './dtos/edit-asignatura.dto';
import { CreateAsignaturaDto } from './dtos/create-asignatura.dto';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class AsignaturasService {
  constructor(
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  // asignaturaPorCarrera(slug: string): Observable<Asignatura[]> {
  //   return from(
  //     this.asignaturaRepository.find({
  //       order: { created_at: 'ASC' },
  //       where: {
  //         carrera: {
  //           slug,
  //         },
  //       },
  //     }),
  //   ).pipe(map((asignaturas: Asignatura[]) => asignaturas));
  // }

  async getById(id: number, asignaturaEntity?: Asignatura) {
    const carrera = await this.asignaturaRepository
      .findOne({ where: { id } })
      .then((d) =>
        !asignaturaEntity ? d : !!d && asignaturaEntity.id === d.id ? d : null,
      );
    if (!carrera)
      throw new NotFoundException('Asignatura no existe o no está autorizado');
    return carrera;
  }

  async createAsignatura(dto: CreateAsignaturaDto) {
    const asignaturaExiste = await this.asignaturaRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (asignaturaExiste)
      throw new BadRequestException('Asignatura ya registrada con ese nombre');

    const nuevaAsignatura = this.asignaturaRepository.create(dto);
    const asignatura = await this.asignaturaRepository.save(nuevaAsignatura);

    return asignatura;
  }

  async editAsignatura(
    id: number,
    dto: EditAsignaturaDto,
    asignaturaEntity?: Asignatura,
  ) {
    const asignatura = await this.getById(id, asignaturaEntity);
    const asignaturaEditada = Object.assign(asignatura, dto);
    return await this.asignaturaRepository.save(asignaturaEditada);
  }

  async deleteAsignatura(id: number, asignaturaEntity?: Asignatura) {
    const carrera = await this.getById(id, asignaturaEntity);
    return await this.asignaturaRepository.remove(carrera);
  }
}
