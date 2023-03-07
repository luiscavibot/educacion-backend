import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaEspecial } from './entity';
import { Repository } from 'typeorm';
import { CreateProgramaEspecialDto } from './dtos/create-programa-especial.dto';
import { EditProgramaEspecialDto } from './dtos/edit-programa-especial.dto';
import { Recursos, TipoProgramasEspeciales } from './consts';

@Injectable()
export class ProgramasEspecialesService {

    constructor(
        @InjectRepository(ProgramaEspecial)
        private readonly programaEspecialRepository: Repository<ProgramaEspecial>
    ) { }


    async createProgramaEspecial(dto: CreateProgramaEspecialDto) {
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

}
