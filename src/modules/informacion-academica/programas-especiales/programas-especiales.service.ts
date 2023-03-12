import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaEspecial } from './entity';
import { Repository, FindOptionsWhere, FindOptionsSelect } from 'typeorm';
import { CreateProgramaEspecialDto } from './dtos/create-programa-especial.dto';
import { EditProgramaEspecialDto } from './dtos/edit-programa-especial.dto';
import { Recursos, TipoProgramasEspeciales, YearsProgramasEspeciales } from './consts';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable, map, from } from 'rxjs';

@Injectable()
export class ProgramasEspecialesService {

    constructor(
        @InjectRepository(ProgramaEspecial)
        private readonly programaEspecialRepository: Repository<ProgramaEspecial>
    ) { }


    async createProgramaEspecial(dto: CreateProgramaEspecialDto) {
        console.log(dto);
        const nuevoProgramaEspecial = this.programaEspecialRepository.create(dto);
        const programaEspecial = await this.programaEspecialRepository.save(nuevoProgramaEspecial);
        return { programaEspecial };    
    }

    async getProgramaEspecialById(id: number) {
        const programaEspecial = await this.programaEspecialRepository
            .findOne({ where: { id } });

        if (!programaEspecial)
            throw new NotFoundException('Programa especial no existe o no está autorizado');
        return programaEspecial;
    }

    async EditProgramaEspecialDto(
        id: number,
        dto: EditProgramaEspecialDto
    ) {

        const programaEspecial = await this.getProgramaEspecialById(id);
        const programaEspecialEditado = Object.assign(programaEspecial, dto);
        return await this.programaEspecialRepository.save(programaEspecialEditado);
    }

    async deleteProgramaEspecial(id: number) {
        const programaEspecial = await this.getProgramaEspecialById(id);
        return await this.programaEspecialRepository.remove(programaEspecial);
    }

    getPaginacionProgramasEspeciales(
        options: IPaginationOptions,
        slug: string,
        sort?: string
    ): Observable<Pagination<ProgramaEspecial>> {
        let order_by = sort?.split(':')[0] || 'id';
        let direction = sort?.split(':')[1] || 'DESC';
        let _where: FindOptionsWhere<ProgramaEspecial> = {
            user: { facultad: { slug } },
        };
        let _select: FindOptionsSelect<ProgramaEspecial> = {
            id: true,
            nombre: true,
            publicado: true
        };
        return from(
            this.programaEspecialRepository.findAndCount({
                skip: Number(options.page) * Number(options.limit) || 0,
                take: Number(options.limit) || 3,
                order: { [order_by]: direction },
                select: _select,
                where: _where,
            }),
        ).pipe(
            map(([alertas, totalAlertas]) => {
                const programasEspecialesPageable: Pagination<ProgramaEspecial> = {
                    items: alertas,
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: alertas.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalAlertas,
                        totalPages: Math.ceil(totalAlertas / Number(options.limit)),
                    },
                };
                return programasEspecialesPageable;
            }),
        );
    }

    recursos() {
        return Object.keys(Recursos).map((key) => ({
          value: key,
          label: Recursos[key],
        }));
    }

    tipoProgramasEspeciales() {
        return Object.keys(TipoProgramasEspeciales).map((key) => ({
          value: key,
          label: TipoProgramasEspeciales[key],
        }));
    }

    yearsInfPosgrado() {
        return YearsProgramasEspeciales.map( year => year );
    }

}
