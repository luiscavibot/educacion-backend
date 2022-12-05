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
    ){}

    async getById(id: number, pregradoEntity?: Pregrado){
        const pregrado = await this.pregradoRepository
        .findOne({ where : { id }})
        .then((d) =>
            !pregradoEntity ? d: !!d && pregradoEntity.id === d.id ? d: null,
        );

        return pregrado;
    }

    paginacionPregrado(
        options: IPaginationOptions,
        slug: string,
        sort: string,
        estado: string,
        query: string
    ): Observable<Pagination<Pregrado>>{
        let order_by = sort?.split(':')[0] || 'id';
        let direction = sort?.split(':')[1] || 'DESC';
        let _where: FindOptionsWhere<Pregrado> = {
            facultad: { slug },
        };
        let _select: FindOptionsSelect<Pregrado> = {
            id: true,
            nombre: true,
            estado: true,
        }
        if(estado && estado == 'true'){
            _select = {
                ..._select,
                escuela: true,
                fijado: true,
                tipo: true,
                anio: true
            }
            _where = { ..._where };
        }

        // if(query.length>=1){
        //     _where = {..._where, nombre: Like(`%${query}%`)}
        // }

        return from(
            this.pregradoRepository.findAndCount({
                skip: Number(options.page) * Number(options.limit) || 0,
                take: Number(options.limit) || 3,
                order: { [order_by]: direction },
                select: _select,
                where: _where,
            }),
        ).pipe(
            map(([pregrados, totalPregrados]) =>{
                const pregradosPageable: Pagination<Pregrado> = {
                    items: pregrados,
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: pregrados.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalPregrados,
                        totalPages: Math.ceil(totalPregrados / Number(options.limit)),
                    }
                };
                return pregradosPageable;
            })
        )

    }

    async createPregrado(dto: CreatePregradoDto){
        const nuevoPregrado = this.pregradoRepository.create(dto);
        const pregrado = await this.pregradoRepository.save(nuevoPregrado);

        return { pregrado };
    }

    async editPregrado(
        id: number,
        dto: EditPregradoDto,
        pregradoEntity?: Pregrado,
    ){
        const pregrado = await this.getById(id, pregradoEntity);
        const pregradoEditado = Object.assign(pregrado, dto);
        return await this.pregradoRepository.save(pregradoEditado);
    }


    async deletePregrado(id:number, pregradoEntity?: Pregrado){
        const pregrado = await this.getById(id, pregradoEntity);
        return await this.pregradoRepository.remove(pregrado);        
    }

    yearsInfPregrado() {
        return YearsInfPregrado.map( year => year );
    }


    tipoInfPregrado() {
        return Object.keys(TipoInfPregrado).map((key) => ({
          value: key,
          label: TipoInfPregrado[key],
        }));
    }

}
