import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Directorio } from './entity/directorio.entity';
import { CreateDirectorioDto } from './dtos/create-directorio.dto';
import { EditDirectorioDto } from './dtos';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class DirectoriosService {
  constructor(
    @InjectRepository(Directorio)
    private readonly directorioRepository: Repository<Directorio>,
  ) {}

  async getById(id: number, directorioEntity?: Directorio) {
    const directorio = await this.directorioRepository
      .findOne({ where: { id } })
      .then((d) =>
        !directorioEntity ? d : !!d && directorioEntity.id === d.id ? d : null,
      );
    if (!directorio)
      throw new NotFoundException('Directorio no existe o no está autorizado');
    return directorio;
  }

  async CreateDirectorio(dto: CreateDirectorioDto) {
    const directorioExiste = await this.directorioRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (directorioExiste)
      throw new BadRequestException('Directorio ya registrado con ese nombre');

    const nuevoDirectorio = this.directorioRepository.create(dto);
    const directorio = await this.directorioRepository.save(nuevoDirectorio);

    return { directorio };
  }

  directoriosPorFacultad(slug: string): Observable<Directorio[]> {
    return from(
      this.directorioRepository.find({
        take: 3,
        order: { id: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          estado: true,
        },
      }),
    ).pipe(map((directorios: Directorio[]) => directorios));
  }

  async editDirectorio(
    id: number,
    dto: EditDirectorioDto,
    directorioEntity?: Directorio,
  ) {
    const directorio = await this.getById(id, directorioEntity);
    const egresadoEditado = Object.assign(directorio, dto);
    return await this.directorioRepository.save(egresadoEditado);
  }

  async deleteDirectorio(id: number, directorioEntity?: Directorio) {
    const directorio = await this.getById(id, directorioEntity);
    return await this.directorioRepository.remove(directorio);
  }
}
