import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Directorio } from './entity/directorio.entity';
import { CreateDirectorioDto } from './dtos/create-directorio.dto';
import { EditDirectorioDto } from './dtos';
import { Observable, from, map } from 'rxjs';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

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

  directoriosPorFacultad(slug: string, search?:string): Observable<Directorio[]> {
    let _where: FindOptionsWhere<Directorio>[] = [{
      user: { facultad: { slug } },
      estado: true,
    }]
    if(search?.length){
      _where = [
        {user: { facultad: { slug } }, estado: true, unidad: Like(`%${search}%`)},
        {user: { facultad: { slug } }, estado: true, cargo: Like(`%${search}%`)},
        {user: { facultad: { slug } }, estado: true, nombre: Like(`%${search}%`)},
      ]
    }
    return from(
      this.directorioRepository.find({
        order: { orden: 'ASC' },
        where: _where,
      }),
    ).pipe(map((directorios: Directorio[]) => directorios));
  }

  paginacionDirectorio(
    options: IPaginationOptions,
    slug: string,
    sort: string,
  ): Observable<Pagination<Directorio>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<Directorio> = {
      user: { facultad: { slug } },
    };
    return from(
      this.directorioRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        where: _where,
      }),
    ).pipe(
      map(([directorios, totaldirectorios]) => {
        const directoriosPageable: Pagination<Directorio> = {
          items: directorios,
          meta: {
            currentPage: Number(options.page),
            itemCount: directorios.length,
            itemsPerPage: Number(options.limit),
            totalItems: totaldirectorios,
            totalPages: Math.ceil(totaldirectorios / Number(options.limit)),
          },
        };
        return directoriosPageable;
      }),
    );
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
