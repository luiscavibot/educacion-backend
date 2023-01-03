import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindOptionsWhere, FindOptionsSelect } from 'typeorm';
import { Posgrado } from './entity';
import { from, map, Observable } from 'rxjs';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreatePosgradoDto, EditPosgradoDto } from './dto';
import { TipoInfPosgrado, TipoProgramaPosgrado, YearsInfPosgrado } from './consts';

@Injectable()
export class PosgradoService {

    constructor(
        @InjectRepository(Posgrado)
        private readonly posgradoRepository: Repository<Posgrado>,
    ){}

    async getById(id: number, posgradoEntity?: Posgrado){
        const posgrado = await this.posgradoRepository
        .findOne({ where : { id }})
        .then((d) =>
            !posgradoEntity ? d: !!d && posgradoEntity.id === d.id ? d: null,
        );

        return posgrado;
    }

    paginacionPosgrado(
        options: IPaginationOptions,
        slug: string,
        // sort: string,
        estado: string,
        // escuelas: string[], 
        // recursos: string[],
        // query: string
    ): Observable<Pagination<Posgrado>>{
        // let order_by = sort?.split(':')[0] || 'id';
        // let direction = sort?.split(':')[1] || 'DESC';
        let condition:any = []; 
        let _where: FindOptionsWhere<Posgrado>[] = [{
            facultad: { slug },
          }];
        let _select: FindOptionsSelect<Posgrado> = {
            id: true,
            nombre: true,
            estado: true,
        }
        if(estado && estado == 'true'){
            _select = {
                ..._select,
                fijado: true,
                tipo: true,
                tipoPrograma: true,
                nombrePrograma: true,
                anio: true
            }
            _where = [..._where ];
        }

        // if(query?.length>0){
        //     _where = [{
        //         facultad: { slug },
        //         nombre: Like(`%${query}%`)
        //       }]
        // }

        // if(escuelas?.length>0){
        //     escuelas.map( (escuela) =>{
        //         if(recursos?.length>0){
        //             recursos.map( (recurso) =>{
        //                 condition.push({escuela, recurso});
        //             })
        //         }else{
        //             condition.push({escuela})
        //         }
        //     })
        // }else{
        //     if(recursos?.length>0){
        //         recursos.map( (recurso) =>{
        //             condition.push({recurso})  
        //         })
        //     }

        // }


        // if (condition?.length>0) {
        //     for(let idx = 0; idx< condition.length; idx++){
        //       if(idx == 0){
        //         if(condition[idx].escuela && condition[idx].recurso){
        //             _where = [
        //                 {..._where[0],
        //                  escuela: Like(`%${condition[idx].escuela}%`),
        //                  tipo: Like(`%${condition[idx]?.recurso}%`)
        //                 }
        //             ]
        //         }else{
        //           if(condition[idx].escuela){
        //             _where = [
        //                 {..._where[0],
        //                  escuela: Like(`%${condition[idx].escuela}%`),
        //                 }
        //             ]
        //           }  
        //           if(condition[idx].recurso){
        //             _where = [
        //                 {..._where[0],
        //                  tipo: Like(`%${condition[idx]?.recurso}%`)
        //                 }
        //             ]
        //           }  
        //         }
        //       }
        //       if(idx>=1){
        //         if(condition[idx].escuela && condition[idx].recurso){
        //             _where = [
        //                 ..._where,
        //                 {..._where[0], 
        //                  escuela: Like(`%${condition[idx]?.escuela}%`),
        //                  tipo: Like(`%${condition[idx].recurso}%`)
        //                 }
        //               ]
        //         }else{
        //           if(condition[idx].escuela){
        //             _where = [
        //                 ..._where,
        //                 {..._where[0], 
        //                  escuela: Like(`%${condition[idx]?.escuela}%`),
        //                 }
        //               ]
        //           }  
        //           if(condition[idx].recurso){
        //             _where = [
        //                 ..._where,
        //                 {..._where[0], 
        //                  tipo: Like(`%${condition[idx].recurso}%`)
        //                 }
        //               ]
        //           }  
        //         }
        //       }
      
        //     }
        // }


        return from(
            this.posgradoRepository.findAndCount({
                skip: Number(options.page) * Number(options.limit) || 0,
                take: Number(options.limit) || 3,
                // order: { [order_by]: direction },
                select: _select,
                where: _where,
            }),
        ).pipe(
            map(([posgrados, totalPosgrados]) =>{
                const posgradosPageable: Pagination<Posgrado> = {
                    items: posgrados,
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: posgrados.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalPosgrados,
                        totalPages: Math.ceil(totalPosgrados / Number(options.limit)),
                    }
                };
                return posgradosPageable;
            })
        )

    }

    async createPosgrado(dto: CreatePosgradoDto){
        const nuevoPosgrado = this.posgradoRepository.create(dto);
        const posgrado = await this.posgradoRepository.save(nuevoPosgrado);

        return { posgrado };
    }

    async editPosgrado(
        id: number,
        dto: EditPosgradoDto,
        posgradoEntity?: Posgrado,
    ){
        const posgrado = await this.getById(id, posgradoEntity);
        const posgradoEditado = Object.assign(posgrado, dto);
        return await this.posgradoRepository.save(posgradoEditado);
    }


    async deletePosgrado(id:number, posgradoEntity?: Posgrado){
        const posgrado = await this.getById(id, posgradoEntity);
        return await this.posgradoRepository.remove(posgrado);        
    }
    yearsInfPosgrado() {
        return YearsInfPosgrado.map( year => year );
    }

    tipoInfPosgrado() {
        return Object.keys(TipoInfPosgrado).map((key) => ({
          value: key,
          label: TipoInfPosgrado[key],
        }));
    }

    tipoProgramaPosgrado() {
        return Object.keys(TipoProgramaPosgrado).map((key) => ({
          value: key,
          label: TipoProgramaPosgrado[key],
        }));
    }

}
