import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository, FindOptionsSelect } from 'typeorm';
import { Adjunto } from './entity';
import { CreateAdjuntoDto, EditAdjuntoDto } from './dtos';
import { from, map } from 'rxjs';

@Injectable()
export class AdjuntosService {
    constructor(
        @InjectRepository(Adjunto)
        private readonly adjuntoRepository: Repository<Adjunto>
    ){}

    async getById(id:number, adjuntoEntity?: Adjunto){
        const adjunto = await this.adjuntoRepository
            .findOne({ where: { id }})
            .then((d)=>
                !adjuntoEntity? d: !!d && adjuntoEntity.id === d.id ? d: null,
            );
        if(!adjunto)
            throw new NotFoundException('Adjunto no existe o no está autorizado');
        return adjunto;
    }

    adjuntosPorColeccion(tipo: string, coleccionId:number){
        let _select : FindOptionsSelect<Adjunto> = {
            id: true,
            nombre: true,
            url: true, 
        }
        let _where: FindOptionsWhere<Adjunto>[] = [];
        if(tipo === 'evento'){
            _where = [
                { evento_id: coleccionId }
            ]
            _select = {
                ..._select,
                evento_id: true
            }
        }
        if(tipo === 'noticia'){
            _where = [
                { noticia_id: coleccionId }
            ]
            _select = {
                ..._select,
                noticia_id: true
            }
        }
        return from(
            this.adjuntoRepository.find({
                select: _select,
                order: { created_at : 'ASC'},
                where: _where.length>0?_where:undefined,
            }),
        ).pipe(map((adjuntos: Adjunto[])=> adjuntos));
    }

    async createAdjunto(dto:CreateAdjuntoDto){
        const nuevoAdjunto = this.adjuntoRepository.create(dto);
        const adjunto = await this.adjuntoRepository.save(nuevoAdjunto);
        return { adjunto };
    }

    async editAdjunto(
        id: number,
        dto: EditAdjuntoDto,
        adjuntoEntity?: Adjunto,
    ){
        const adjunto = await this.getById(id, adjuntoEntity);
        const adjuntoEditado = Object.assign(adjunto, dto);
        return await this.adjuntoRepository.save(adjuntoEditado);
    }


    async deleteAdjunto(id: number, adjuntoEntity?: Adjunto){
        const adjunto = await this.getById(id, adjuntoEntity);
        return await this.adjuntoRepository.remove(adjunto);
    }


}
