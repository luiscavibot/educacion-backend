import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAlertaAdmisionPosgradoDto, EditAlertaAdmisionPosgradoDto } from './dtos';
import { AlertaAdmisionPosgrado } from './entity';

@Injectable()
export class AlertaAdmisionPosgradoService {
    constructor(
        @InjectRepository(AlertaAdmisionPosgrado)
        private readonly alertaAdmisionPosgradoRepository: Repository<AlertaAdmisionPosgrado>
    ) { }

    async createAlertaAdmisionPosgrado(dto: CreateAlertaAdmisionPosgradoDto) {
        this.setDates(dto);           
        const nuevaAlertaAdmisionPosgrado = this.alertaAdmisionPosgradoRepository.create(dto);
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.save(nuevaAlertaAdmisionPosgrado);

        return { alertaAdmisionPosgrado };
    }

    async editAlertaAdmisionPosgrado(
        slug: string,
        dto: EditAlertaAdmisionPosgradoDto
    ) {
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                user: { facultad: { slug } }
            },
        });

        if (!alertaAdmisionPosgrado) {
            throw new NotFoundException('Alerta de admisión no existe o no está autorizado');
        }

        this.setDates(dto);        
        const alertaAdmisionPosgradoEditada = Object.assign(alertaAdmisionPosgrado, dto);
        return await this.alertaAdmisionPosgradoRepository.save(alertaAdmisionPosgradoEditada);
    }

    async getAlertaAdmisionPosgradoVigente(slug: string): Promise<AlertaAdmisionPosgrado> {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);

        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                publicado: true,
                user: { facultad: { slug } },
                fecha_inicio: LessThanOrEqual(currentDate),
                fecha_fin: MoreThanOrEqual(currentDate),
            },
        });

        if (!alertaAdmisionPosgrado) {
            throw new NotFoundException('No hay alerta de admisión vigente para esta facultad');
        }

        return alertaAdmisionPosgrado;
    }

    async deleteAlertaAdmisionPosgrado(slug: string) {
        const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
            where: {
                user: { facultad: { slug } },
            }
        });

        if (!alertaAdmisionPosgrado)
            throw new NotFoundException('Alerta de admisión no existe o no está autorizado');

        await this.alertaAdmisionPosgradoRepository.remove(alertaAdmisionPosgrado);
    }

    setDates(dto: { fecha_inicio?: any, fecha_fin?: any }): void {
        if (dto.fecha_inicio) {
            const date = new Date(`${dto.fecha_inicio}T00:00:00`);
            date.setHours(date.getHours() - 5);
            dto.fecha_inicio = date;
        }
    
        if (dto.fecha_fin) {
            const date = new Date(`${dto.fecha_fin}T00:00:00`);
            date.setDate(date.getDate() + 1);
            date.setHours(date.getHours() - 5);
            dto.fecha_fin = date;
        }
    }

}