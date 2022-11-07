import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnlaceInteres } from './entity/enlace-interes.entity';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class EnlacesInteresService {

    constructor(
     @InjectRepository(EnlaceInteres)
     private readonly enlaceInteresRepository: Repository<EnlaceInteres>
    ){}

    enlacesDeInteresPorCarrera(slug: string): Observable<EnlaceInteres[]> {
        return from(
          this.enlaceInteresRepository.find({
            order: { id: 'DESC' },
            select: ['label','link'],
            where: {
              carrera: {
                slug,
              },
              estado: true,
            },
          }),
        ).pipe(
          map((enlacesInteres: EnlaceInteres[]) => enlacesInteres),
        );
    }

}
