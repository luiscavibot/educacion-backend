import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entity/programa.entity';
import { Repository, FindOptionsWhere, FindOptionsSelect } from 'typeorm';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { generateSlug } from '../../helpers/generateSlug';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { EditProgramaDto } from './dto/edit-programa.dto';
import { StorageService } from '../storage/storage.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class ProgramasService {

    constructor(
        @InjectRepository(Programa)
        private readonly programaRepository: Repository<Programa>,
        private readonly storageService: StorageService
    ){}


    paginacionProgramas(
      options: IPaginationOptions,
      slug: string,
      sort: string,
      estado: string,
    ): Observable<Pagination<Programa>> {
      let order_by = sort?.split(':')[0] || 'id';
      let direction = sort?.split(':')[1] || 'DESC';
      let _where: FindOptionsWhere<Programa> = {
        facultad: { slug },
      };
      let _select: FindOptionsSelect<Programa> = {
        id: true,
        nombre: true,
        estado: true,
      };
      if (estado && estado == 'true') {
        _select = {
          ..._select,
          foto: true,
          slug: true,
        };
        _where = { ..._where, estado: true };
      }
      return from(
        this.programaRepository.findAndCount({
          skip: Number(options.page) * Number(options.limit) || 0,
          take: Number(options.limit) || 3,
          order: { [order_by]: direction },
          select: _select,
          where: _where,
        }),
      ).pipe(
        map(([programas, totalProgramas]) => {
          const programasPageable: Pagination<Programa> = {
            items: programas,
            meta: {
              currentPage: Number(options.page),
              itemCount: programas.length,
              itemsPerPage: Number(options.limit),
              totalItems: totalProgramas,
              totalPages: Math.ceil(totalProgramas / Number(options.limit)),
            },
          };
          return programasPageable;
        }),
      );
    }

    listaDeProgramas(
      slug: string,
      tipo: string,
    ): Observable<Programa[]> {
      return from(
        this.programaRepository.find({
          order: { created_at: 'ASC' },
          select: { slug: true, nombre:true},
          where: {
            facultad: {
              slug,
            },
            tipo
          },
        }),
      ).pipe(map((programas: Programa[]) => programas));
    }


    async getById(id: number, programaEntity?: Programa) {
        const programa = await this.programaRepository
          .findOne({ where: { id } })
          .then((d) =>
            !programaEntity ? d : !!d && programaEntity.id === d.id ? d : null,
          );
        if (!programa)
          throw new NotFoundException('Programa no existe o no está autorizado');
        return programa;
    }

    async createPrograma(dto: CreateProgramaDto, file: any) {
        const hash = Date.now().toString();
    
        dto.slug = await generateSlug(dto.nombre, hash);
    
        if (file) {
          const nombre_foto = fileFilterName(file, hash);
          if (!nombre_foto) {
            throw new BadRequestException('Archivo no válido');
          }
          let { Location } = await this.storageService.uploadFile(
            file,
            nombre_foto,
          );
          dto.foto = Location;
        }
        const nuevoPrograma = this.programaRepository.create(dto);
        const programa = await this.programaRepository.save(nuevoPrograma);
    
        return { programa };
      }

      async editPrograma(
        id: number,
        dto: EditProgramaDto,
        file: any,
        programaEntity?: Programa,
      ) {
        const programa = await this.getById(id, programaEntity);
        if (programa.foto != '' && file) {
          await this.storageService.deleteFile(programa.foto);
        }
    
        if (file) {
          const hash = Date.now().toString();
          const nombre_foto = fileFilterName(file, hash);
    
          if (!nombre_foto) {
            throw new BadRequestException('Archivo no válido');
          }
          let { Location } = await this.storageService.uploadFile(
            file,
            nombre_foto,
          );
          dto.foto = Location;
        }
    
        const programaEditado = Object.assign(programa, dto);
        return await this.programaRepository.save(programaEditado);
      }
    
      async deletePrograma(id: number, programaEntity?: Programa) {
        const programa = await this.getById(id, programaEntity);
        if (programa.foto != '') {
          await this.storageService.deleteFile(programa.foto);
        }
        return await this.programaRepository.remove(programa);
      }

}
