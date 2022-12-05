import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, FindOptionsSelect } from 'typeorm';
import { Comunicado } from './entity';
import { CreateComunicadosDto } from './dto/create-comunicados.dto';
import { fileFilterName } from '../../../helpers/fileFilerName.helpers';
import { StorageService } from '../../storage/storage.service';
import { EditComunicadosDto } from './dto/edit-comunicados.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class ComunicadosService {

    constructor(
        @InjectRepository(Comunicado)
        private readonly comunicadoRepository: Repository<Comunicado>,
        private readonly storageService: StorageService,
    ){}

    async getById(id: number, comunicadoEntity?: Comunicado){
        const comunicado = await this.comunicadoRepository
        .findOne({ where: { id } })
        .then((d) =>
          !comunicadoEntity ? d : !!d && comunicadoEntity.id === d.id ? d : null,
        );
        
        return comunicado;
    }

    paginacionComunicados(
        options: IPaginationOptions,
        slug: string,
        sort: string,
        estado: string,
      ): Observable<Pagination<Comunicado>> {
        let order_by = sort?.split(':')[0] || 'id';
        let direction = sort?.split(':')[1] || 'DESC';
        let _where: FindOptionsWhere<Comunicado> = {
          facultad: { slug },
        };
        let _select: FindOptionsSelect<Comunicado> = {
          id: true,
          nombre: true,
          estado: true,
        };
        if (estado && estado == 'true') {
          _select = {
            ..._select,
            foto: true,
            fecha: true,
            resumen: true,
          };
          _where = { ..._where };
        }
        return from(
          this.comunicadoRepository.findAndCount({
            skip: Number(options.page) * Number(options.limit) || 0,
            take: Number(options.limit) || 3,
            order: { [order_by]: direction },
            select: _select,
            where: _where,
          }),
        ).pipe(
          map(([comunicados, totalComunicados]) => {
            const comunicadosPageable: Pagination<Comunicado> = {
              items: comunicados,
              meta: {
                currentPage: Number(options.page),
                itemCount: comunicados.length,
                itemsPerPage: Number(options.limit),
                totalItems: totalComunicados,
                totalPages: Math.ceil(totalComunicados / Number(options.limit)),
              },
            };
            return comunicadosPageable;
          }),
        );
      }

    async createComunicado(dto: CreateComunicadosDto, file: any){
        const comunicadoExiste = await this.comunicadoRepository.findOne({
            where: { nombre: dto.nombre},
        })

        const hash =  Date.now().toString();

        if(file){
            const nombreFoto = fileFilterName(file, hash);
            if(!nombreFoto){
                throw new BadRequestException('Archivo no válido');
            }
            let { Location } =  await this.storageService.uploadFile(
                file,
                nombreFoto
            )
            dto.foto = Location;
        }

        const nuevoComunicado = this.comunicadoRepository.create(dto);
        const comunicado = await this.comunicadoRepository.save(nuevoComunicado);

        return { comunicado };
    }


    async editComunicado(
        id: number,
        dto: EditComunicadosDto,
        file: any,
        comunicadoEntity?: Comunicado,
    ){
        const comunicado = await this.getById(id, comunicadoEntity);
        if(comunicado.foto != '' && file){
            await this.storageService.deleteFile(comunicado.foto);
        }

        if(file){
            const hash  = Date.now().toString();
            const nombreFoto = fileFilterName(file, hash);

            if(!nombreFoto){
                throw new BadRequestException('Archivo no valido');
            }

            let { Location } = await this.storageService.uploadFile(
                file,
                nombreFoto
            )

            dto.foto = Location;
        }
        const comunicadoEditado = Object.assign(comunicado, dto);
        return await this.comunicadoRepository.save(comunicadoEditado);
    }


    async deleteComunicado(id:number, comunicadoEntity?: Comunicado){
        const comunicado = await this.getById(id, comunicadoEntity);
        return await this.comunicadoRepository.remove(comunicado);        
    }


}
