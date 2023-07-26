import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dirigido } from './entity/';
import { Repository } from 'typeorm';
import { CreateDirigidoDto, EditDirigidoDto } from './dto';

@Injectable()
export class DirigidosService {

    constructor(
        @InjectRepository(Dirigido)
        private readonly dirigidoRepository: Repository<Dirigido>,
      ) {}
    
      async getById(id: number, dirigidoEntity?: Dirigido) {
        const dirigido = await this.dirigidoRepository
          .findOne({ where: { id } })
          .then((d) =>
            !dirigidoEntity ? d : !!d && dirigidoEntity.id === d.id ? d : null,
          );
        if (!dirigido)
          throw new NotFoundException('dirigido no existe o no está autorizado');
        return dirigido;
      }
    
      async createDirigido(dto: CreateDirigidoDto) {
        const nuevodirigido = this.dirigidoRepository.create(dto);
        const dirigido = await this.dirigidoRepository.save(nuevodirigido);
    
        return { dirigido };
      }
    
    
      async editDirigido(
        id: number,
        dto: EditDirigidoDto,
        dirigidoEntity?: Dirigido,
      ) {
        const dirigido = await this.getById(id, dirigidoEntity);
        const dirigidoEditado = Object.assign(dirigido, dto);
        return await this.dirigidoRepository.save(dirigidoEditado);
      }
    
      async deleteDirigido(id: number, dirigidoEntity?: Dirigido) {
        const dirigido = await this.getById(id, dirigidoEntity);
        return await this.dirigidoRepository.remove(dirigido);
      }
}
