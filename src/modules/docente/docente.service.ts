import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Docente } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocenteDto, EditDocenteDto } from './dtos';

export interface DocenteFindOne {
  id?: number;
  nombre?: string;
}
@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private readonly docenteRepository: Repository<Docente>,
  ) {}

  async getMany() {
    return await this.docenteRepository.find();
  }

  async getById(id: number, docenteEntity?: Docente) {
    const docente = await this.docenteRepository
      .findOne({ where: { id } })
      .then((d) =>
        !docenteEntity ? d : !!d && docenteEntity.id === d.id ? d : null,
      );
    if (!docente)
      throw new NotFoundException('Docente no existe o no está autorizado');
    return docente;
  }

  async createOne(dto: CreateDocenteDto) {
    const docenteExist = await this.docenteRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (docenteExist)
      throw new BadRequestException('docente already registered with email');

    const nuevoDocente = this.docenteRepository.create(dto);
    const docente = await this.docenteRepository.save(nuevoDocente);

    delete docente.nombre;
    return docente;
  }

  async editOne(id: number, dto: EditDocenteDto, docenteEntity?: Docente) {
    // console.log(dto);
    const docente = await this.getById(id, docenteEntity);
    const docenteEditado = Object.assign(docente, dto);
    return await this.docenteRepository.save(docenteEditado);
  }

  async deleteOne(id: number, docenteEntity?: Docente) {
    const docente = await this.getById(id, docenteEntity);
    return await this.docenteRepository.remove(docente);
  }

  async findOne(data: DocenteFindOne) {
    return await this.docenteRepository
      .createQueryBuilder('docente')
      .where(data)
      .addSelect('docente.nombre')
      .getOne();
  }
}
