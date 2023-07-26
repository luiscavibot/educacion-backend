import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository, FindOptionsWhere } from 'typeorm';
import { CreateAlertaAdmisionDto, EditAlertaAdmisionDto } from './dtos';
import { AlertaAdmision } from './entity';

@Injectable()
export class AlertaAdmisionService {
    constructor(
        @InjectRepository(AlertaAdmision)
        private readonly alertaAdmisionRepository: Repository<AlertaAdmision>
    ) { }

    async createAlertaAdmision(dto: CreateAlertaAdmisionDto) {
        this.setDates(dto);           
        const nuevaAlertaAdmision = this.alertaAdmisionRepository.create(dto);
        const alertaAdmision = await this.alertaAdmisionRepository.save(nuevaAlertaAdmision);

        return { alertaAdmision };
    }

    async getAlertaInformativaById(id: number) {
        const alertaInformativa = await this.alertaAdmisionRepository
            .findOne({ where: { id } });

        if (!alertaInformativa)
            throw new NotFoundException('Alerta informativa no existe o no está autorizado');
        return alertaInformativa;
    }


    async getAlertaAdmision(slug: string, isPublic: boolean): Promise<AlertaAdmision> {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 5);
        let _where: FindOptionsWhere<AlertaAdmision>[] = [
            {
                user: { facultad: { slug } }, 
            }
        ];
        
        if(isPublic){
         _where = [
            {
                publicado: true,
                user: { facultad: { slug } },
                fecha_inicio: LessThanOrEqual(currentDate),
                fecha_fin: MoreThanOrEqual(currentDate),
            }
         ]
        }
        const alertaAdmision = await this.alertaAdmisionRepository.findOne({
            where: _where
        });
        return alertaAdmision;
    }
    
    async editAlertaAdmision(
            id: number,
            dto: EditAlertaAdmisionDto
        ) {
            const alertaAdmision = await this.alertaAdmisionRepository.findOne({
                where: {
                    id
                },
            });
    
            if (!alertaAdmision) {
                throw new NotFoundException('Alerta de admisión no existe o no está autorizado');
            }
    
            this.setDates(dto);        
            const alertaAdmisionEditada = Object.assign(alertaAdmision, dto);
            return await this.alertaAdmisionRepository.save(alertaAdmisionEditada);
    }


    // async getAlertaAdmisionPosgradoVigente(slug: string): Promise<AlertaAdmisionPosgrado> {
    //     const currentDate = new Date();
    //     currentDate.setHours(currentDate.getHours() - 5);

    //     const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoRepository.findOne({
    //         where: {
    //             publicado: true,
    //             user: { facultad: { slug } },
    //             fecha_inicio: LessThanOrEqual(currentDate),
    //             fecha_fin: MoreThanOrEqual(currentDate),
    //         },
    //     });

    //     if (!alertaAdmisionPosgrado) {
    //         throw new NotFoundException('No hay alerta de admisión vigente para esta facultad');
    //     }

    //     return alertaAdmisionPosgrado;
    // }

    async deleteAlertaAdmision(slug: string) {
        const alertaAdmision = await this.alertaAdmisionRepository.findOne({
            where: {
                user: { facultad: { slug } },
            }
        });

        if (!alertaAdmision)
            throw new NotFoundException('Alerta de admisión no existe o no está autorizado');

        await this.alertaAdmisionRepository.remove(alertaAdmision);
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