import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';
import { FindOptionsSelect, FindOptionsWhere, Not, Repository } from 'typeorm';
import { CreateAlertaInformativaDto, EditAlertaInformativaDto } from './dtos';
import { AlertaInformativa } from './entity';

@Injectable()
export class AlertasInformativasService {
    constructor(
        @InjectRepository(AlertaInformativa)
        private readonly alertaInformativaRepository: Repository<AlertaInformativa>
    ) { }

    async createAlertaInformativa(dto: CreateAlertaInformativaDto) {
        const nuevaAlertaInformativa = this.alertaInformativaRepository.create(dto);
        const alertaInformativa = await this.alertaInformativaRepository.save(nuevaAlertaInformativa);
        return { alertaInformativa };
    }

    async getAlertaInformativaPublicada(slug: string): Promise<AlertaInformativa> {
        const alertaInformativa = await this.alertaInformativaRepository.findOne({
            where: {
                publicado: true,
                user: { facultad: { slug } },
            }
        });
        
        if (!alertaInformativa) {
            throw new NotFoundException('No hay alerta informativa publicada para esta facultad');
        }
        return alertaInformativa;
    }

    async getAlertaInformativaById(id: number) {
        const alertaInformativa = await this.alertaInformativaRepository
            .findOne({ where: { id } });

        if (!alertaInformativa)
            throw new NotFoundException('Alerta informativa no existe o no está autorizado');
        return alertaInformativa;
    }

    async editAlertaInformativa(
        id: number,
        dto: EditAlertaInformativaDto
    ) {
        const hasActiveAlertaInformativa = await this.alertaInformativaRepository.findOne({
            where: {
                publicado: true,
                id: Not(id),
            },
        });

        if (hasActiveAlertaInformativa) {
            hasActiveAlertaInformativa.publicado = false;
            await this.alertaInformativaRepository.save(hasActiveAlertaInformativa);
        }

        const alertaInformativa = await this.getAlertaInformativaById(id);
        const alertaInformativaEditada = Object.assign(alertaInformativa, dto);
        return await this.alertaInformativaRepository.save(alertaInformativaEditada);
    }

    async deleteAlertaInformativa(id: number) {
        const alertaInformativa = await this.getAlertaInformativaById(id);
        return await this.alertaInformativaRepository.remove(alertaInformativa);
    }
 
    getPaginacionAlertasInformativas(
        options: IPaginationOptions,
        slug: string,
        sort?: string
    ): Observable<Pagination<AlertaInformativa>> {
        let order_by = sort?.split(':')[0] || 'id';
        let direction = sort?.split(':')[1] || 'DESC';
        let _where: FindOptionsWhere<AlertaInformativa> = {
            user: { facultad: { slug } },
        };
        let _select: FindOptionsSelect<AlertaInformativa> = {
            id: true,
            titulo: true,
            publicado: true
        };
        return from(
            this.alertaInformativaRepository.findAndCount({
                skip: Number(options.page) * Number(options.limit) || 0,
                take: Number(options.limit) || 3,
                order: { [order_by]: direction },
                select: _select,
                where: _where,
            }),
        ).pipe(
            map(([alertas, totalAlertas]) => {
                const alertasPageable: Pagination<AlertaInformativa> = {
                    items: alertas,
                    meta: {
                        currentPage: Number(options.page),
                        itemCount: alertas.length,
                        itemsPerPage: Number(options.limit),
                        totalItems: totalAlertas,
                        totalPages: Math.ceil(totalAlertas / Number(options.limit)),
                    },
                };
                return alertasPageable;
            }),
        );
    }

}