import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
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
    const nuevoDirectorio = this.directorioRepository.create(dto);
    const directorio = await this.directorioRepository.save(nuevoDirectorio);

    return { directorio };
  }

  directoriosPorFacultad(slug: string, search:string): Observable<Directorio[]> {
    let _where: FindOptionsWhere<Directorio>[] = [{
      facultad: {
        slug,
      },
      estado: true,
    }]
    if(search?.length){
      _where = [
        {facultad: {slug,},estado: true, unidad: Like(`%${search}%`)},
        {facultad: {slug,},estado: true, cargo: Like(`%${search}%`)},
        {facultad: {slug,},estado: true, nombre: Like(`%${search}%`)},
      ]
    }
    return from(
      this.directorioRepository.find({
        order: { id: 'ASC' },
        where: _where,
      }),
    ).pipe(map((directorios: Directorio[]) => directorios));
  }

  async editDirectorio(
    id: number,
    dto: EditDirectorioDto,
    directorioEntity?: Directorio,
  ) {
    const directorio = await this.getById(id, directorioEntity);
    const directorioEditado = Object.assign(directorio, dto);
    return await this.directorioRepository.save(directorioEditado);
  }

  async deleteDirectorio(id: number, directorioEntity?: Directorio) {
    const directorio = await this.getById(id, directorioEntity);
    return await this.directorioRepository.remove(directorio);
  }
}
