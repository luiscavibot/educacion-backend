import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

    async getAlertaAdmisionPosgradoPublicada(slug: string): Promise<AlertaAdmisionPosgrado> {
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                publicado: true,
                user: { facultad: { slug } },
            }
        });

        if (!alertaAdmisionPosgrado) {
            throw new NotFoundException('No hay alerta de admisión publicada para esta facultad');
        }

        return alertaAdmisionPosgrado;
    }

    async editAlertaAdmisionPosgrado(slug: string) {
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                publicado: false,
                user: { facultad: { slug } },
            }
        });

        if (!alertaAdmisionPosgrado)
            throw new NotFoundException('Alerta de admisión no existe o no está autorizado');

        alertaAdmisionPosgrado.publicado = true;
        return await this.alertaAdmisionPosgradoRepository.save(alertaAdmisionPosgrado);
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