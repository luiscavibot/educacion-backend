import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pregrado } from './entity/pregrado.entity';
import { Repository, FindOptionsWhere, FindOptionsSelect, Like } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { CreatePregradoDto } from './dto/create-pregrado.dto';
import { EditPregradoDto } from './dto';
import { YearsInfPregrado, TipoInfPregrado } from './consts/';

@Injectable()
export class PregradoService {
  constructor(
    @InjectRepository(Pregrado)
    private readonly pregradoRepository: Repository<Pregrado>,
  ) {}

  async getById(id: number, pregradoEntity?: Pregrado) {
    const pregrado = await this.pregradoRepository
      .findOne({ where: { id } })
      .then((d) =>
        !pregradoEntity ? d : !!d && pregradoEntity.id === d.id ? d : null,
      );

    return pregrado;
  }

  paginacionPregrado(
    options: IPaginationOptions,
    slug: string,
    sort: string,
    estado: string,
    escuelas: string[],
    recursos: string[],
    query: string,
    fijado: boolean,
    anio: string,
  ): Observable<Pagination<Pregrado>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let condition: any = [];
    let _where: FindOptionsWhere<Pregrado>[] = [
      {
        user: { facultad: { slug } },
        fijado,
        anio,
      },
    ];
    let _select: FindOptionsSelect<Pregrado> = {
      id: true,
      nombre: true,
      estado: true,
    };
    if (fijado) {
      _where = [
        {
          user: { facultad: { slug } },
          fijado,
        },
      ];
    }
    if (anio) {
      _where = [
        {
          user: { facultad: { slug } },
          fijado,
          anio,
        },
      ];
    }
    if (estado && estado == 'true') {
      _select = {
        ..._select,
        escuela: true,
        fijado: true,
        tipo: true,
        anio: true,
        updated_at: true,
        url: true,
      };
      _where = [..._where];
    }

    if (query?.length > 0) {
      _where = [
        {
          user: { facultad: { slug } },
          fijado,
          anio,
          nombre: Like(`%${query}%`),
        },
      ];
    }

    if (escuelas?.length > 0) {
      escuelas.map((escuela) => {
        if (recursos?.length > 0) {
          recursos.map((recurso) => {
            condition.push({ escuela, recurso });
          });
        } else {
          condition.push({ escuela });
        }
      });
    } else {
      if (recursos?.length > 0) {
        recursos.map((recurso) => {
          condition.push({ recurso });
        });
      }
    }

    if (condition?.length > 0) {
      for (let idx = 0; idx < condition.length; idx++) {
        if (idx == 0) {
          if (condition[idx].escuela && condition[idx].recurso) {
            _where = [
              {
                ..._where[0],
                escuela: Like(`${condition[idx].escuela}`),
                tipo: Like(`%${condition[idx]?.recurso}%`),
              },
            ];
          } else {
            if (condition[idx].escuela) {
              _where = [
                { ..._where[0], escuela: Like(`${condition[idx].escuela}`) },
              ];
            }
            if (condition[idx].recurso) {
              _where = [
                { ..._where[0], tipo: Like(`%${condition[idx]?.recurso}%`) },
              ];
            }
          }
        }
        if (idx >= 1) {
          if (condition[idx].escuela && condition[idx].recurso) {
            _where = [
              ..._where,
              {
                ..._where[0],
                escuela: Like(`${condition[idx]?.escuela}`),
                tipo: Like(`%${condition[idx].recurso}%`),
              },
            ];
          } else {
            if (condition[idx].escuela) {
              _where = [
                ..._where,
                { ..._where[0], escuela: Like(`${condition[idx]?.escuela}`) },
              ];
            }
            if (condition[idx].recurso) {
              _where = [
                ..._where,
                { ..._where[0], tipo: Like(`%${condition[idx].recurso}%`) },
              ];
            }
          }
        }
      }
    }

    return from(
      this.pregradoRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
      }),
    ).pipe(
      map(([pregrados, totalPregrados]) => {
        const pregradosPageable: Pagination<Pregrado> = {
          items: pregrados,
          meta: {
            currentPage: Number(options.page),
            itemCount: pregrados.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalPregrados,
            totalPages: Math.ceil(totalPregrados / Number(options.limit)),
          },
        };
        return pregradosPageable;
      }),
    );
  }

  async createPregrado(dto: CreatePregradoDto) {
    const nuevoPregrado = this.pregradoRepository.create(dto);
    const pregrado = await this.pregradoRepository.save(nuevoPregrado);

    return { pregrado };
  }

  async editPregrado(
    id: number,
    dto: EditPregradoDto,
    pregradoEntity?: Pregrado,
  ) {
    const pregrado = await this.getById(id, pregradoEntity);
    const pregradoEditado = Object.assign(pregrado, dto);
    return await this.pregradoRepository.save(pregradoEditado);
  }

  async deletePregrado(id: number, pregradoEntity?: Pregrado) {
    const pregrado = await this.getById(id, pregradoEntity);
    return await this.pregradoRepository.remove(pregrado);
  }

  yearsInfPregrado() {
    return YearsInfPregrado.map((year) => year);
  }

  tipoInfPregrado() {
    return Object.keys(TipoInfPregrado).map((key) => ({
      value: key,
      label: TipoInfPregrado[key],
    }));
  }
}
