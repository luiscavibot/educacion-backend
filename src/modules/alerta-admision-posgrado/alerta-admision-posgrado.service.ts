import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, FindOptionsWhere } from 'typeorm';
import { CreateAlertaAdmisionPosgradoDto, EditAlertaAdmisionPosgradoDto } from './dtos';
import { AlertaAdmisionPosgrado } from './entity';

@Injectable()
export class AlertaAdmisionPosgradoService {
    constructor(
        @InjectRepository(AlertaAdmisionPosgrado)
        private readonly alertaAdmisionPosgradoRepository: Repository<AlertaAdmisionPosgrado>
    ) { }

    async createAlertaAdmisionPosgrado(dto: CreateAlertaAdmisionPosgradoDto) {
        const nuevaAlertaAdmisionPosgrado = this.alertaAdmisionPosgradoRepository.create(dto);
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.save(nuevaAlertaAdmisionPosgrado);
        
        return { alertaAdmisionPosgrado };
    }

    async getAlertaInformativaById(id: number) {
        const alertaInformativa = await this.alertaAdmisionPosgradoRepository
            .findOne({ where: { id } });

        if (!alertaInformativa)
            throw new NotFoundException('Alerta informativa no existe o no está autorizado');
        return alertaInformativa;
    }

    async getAlertaAdmisionPosgrado(slug: string, isPublic: boolean): Promise<AlertaAdmisionPosgrado> {
        let _where: FindOptionsWhere<AlertaAdmisionPosgrado>[] = [
            {
                user: { facultad: { slug } }, 
            }
        ];
        
        if(isPublic){
            console.log(typeof(isPublic));
            console.log("entra?")
         _where = [
            {
                publicado: true,
                user: { facultad: { slug } },
            }
         ]
        }
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: _where
        });


        return alertaAdmisionPosgrado;
    }

    async editAlertaAdmisionPosgrado(id: number,
        dto: EditAlertaAdmisionPosgradoDto) {
        const alertaAdmisionPosgrado = await this.getAlertaInformativaById(id);
        const alertaAdmisionPosgradoEditado = Object.assign(alertaAdmisionPosgrado, dto);
        return await this.alertaAdmisionPosgradoRepository.save(alertaAdmisionPosgradoEditado);
    }


    async deleteAlertaAdmisionPosgrado(slug: string) {
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                publicado: true,
                user: { facultad: { slug } },
            }
        });

        if (!alertaAdmisionPosgrado)
            throw new NotFoundException('Alerta de admisión no existe o no está autorizado');

        await this.alertaAdmisionPosgradoRepository.remove(alertaAdmisionPosgrado);
    }

}