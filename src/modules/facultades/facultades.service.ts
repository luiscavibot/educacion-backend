import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFacultadDto, EditFacultadDto } from './dtos';
import { Facultad } from './entity';

export interface FacultadFindOne {
  id?: number;
  nombre?: string;
}

@Injectable()
export class FacultadesService {
  constructor(
    @InjectRepository(Facultad)
    private readonly facultadRepository: Repository<Facultad>,
  ) {}

  async getMany() {
    return await this.facultadRepository.find();
  }

  async getById(id: number, facultadEntity?: Facultad) {
    const facultad = await this.facultadRepository
      .findOne({ relations: { dirigidos: true } ,where: { id } })
      .then((d) =>
        !facultadEntity ? d : !!d && facultadEntity.id === d.id ? d : null,
      );
    if (!facultad)
      throw new NotFoundException('Facultad no existe o no está autorizado');
    return facultad;
  }

  async getDirigidosPorFacultad(id: number, facultadEntity?: Facultad) {
    const facultad = await this.facultadRepository
      .findOne( { select: ['dirigidos'], relations: { dirigidos: true } ,where: { id } })
      .then((d) =>
        !facultadEntity ? d : !!d && facultadEntity.id === d.id ? d : null,
      );
    if (!facultad)
      throw new NotFoundException('Facultad no existe o no está autorizado');
    return facultad;
  }

  async createFacultad(dto: CreateFacultadDto) {
    const facultadExiste = await this.facultadRepository.findOne({
      where: { nombre: dto.nombre },
    });
    if (facultadExiste)
      throw new BadRequestException('Facultad ya registrada con ese nombre');

    const nuevaFacultad = this.facultadRepository.create(dto);
    const facultad = await this.facultadRepository.save(nuevaFacultad);

    return facultad;
  }

  async editFacultad(
    id: number,
    dto: EditFacultadDto,
    facultadEntity?: Facultad,
  ) {
    const facultad = await this.getById(id, facultadEntity);
    const facultadEditado = Object.assign(facultad, dto);
    return await this.facultadRepository.save(facultadEditado);
  }

  async deleteFacultad(id: number, facultadEntity?: Facultad) {
    const facultad = await this.getById(id, facultadEntity);
    return await this.facultadRepository.remove(facultad);
  }

  async findOne(data: FacultadFindOne) {
    return await this.facultadRepository
      .createQueryBuilder('facultad')
      .where(data)
      .addSelect('facultad.nombre')
      .getOne();
  }


  async listFacultades(): Promise<{ nombre: string; slug: string }[]> {
    const facultades = await this.facultadRepository.find({
      where: [
        { nombre: Not(IsNull()), slug: Not(IsNull()) },
        { nombre: Not(''), slug: Not('') },
        { slug: Not(IsNull()) }
      ],
    });
    const facultadesValidas = facultades.filter(facultad => facultad.slug.trim() !== '');
    return facultadesValidas.map(({ nombre, slug }) => ({ nombre, slug }));
  }
}
