import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Area } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAreaDto, EditAreaDto } from './dtos';

export interface AreaFindOne {
  id?: number;
  nombre?: string;
}

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async getMany() {
    return await this.areaRepository.find();
  }

  async getById(id: number, areaEntity?: Area) {
    const area = await this.areaRepository
      .findOne({ where: { id } })
      .then((d) =>
        !areaEntity ? d : !!d && areaEntity.id === d.id ? d : null,
      );
    if (!area)
      throw new NotFoundException('Area no existe o no está autorizado');
    return area;
  }

  async createArea(dto: CreateAreaDto) {
    const areaExiste = await this.areaRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (areaExiste)
      throw new BadRequestException('Area ya registrado con ese nombre');

    const nuevaArea = this.areaRepository.create(dto);
    const area = await this.areaRepository.save(nuevaArea);

    return area;
  }

  async editArea(id: number, dto: EditAreaDto, areaEntity?: Area) {
    const area = await this.getById(id, areaEntity);
    const areaEditado = Object.assign(area, dto);
    return await this.areaRepository.save(areaEditado);
  }

  async deleteArea(id: number, areaEntity?: Area) {
    const area = await this.getById(id, areaEntity);
    return await this.areaRepository.remove(area);
  }

  async findOne(data: AreaFindOne) {
    return await this.areaRepository
      .createQueryBuilder('area')
      .where(data)
      .addSelect('area.nombre')
      .getOne();
  }
}
