import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticiaDto, EditNoticiaDto, PaginationQueryDto } from './dtos';
import { Noticia } from './entity/noticia.entity';

export interface NoticiaFindOne {
  id?: number;
  titulo?: string;
}

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
  ) {}

  // async getLastNoticias(){
  //   return await this.noticiaRepository.find();
  // }
  async getLastNoticias(id) {
    return await this.noticiaRepository
      .createQueryBuilder('noticia')
      .innerJoinAndSelect('noticia.facultad', 'facultad', 'facultad.id = :id', {
        id: id,
      })
      .limit(2)
      .orderBy('noticia.created_at', 'DESC')
      .getMany();
  }

  async getMany({ limit, offset }: PaginationQueryDto) {
    return await this.noticiaRepository.find({ skip: offset, take: limit });
  }

  async getById(id: number, noticiaEntity?: Noticia) {
    const noticia = await this.noticiaRepository
      .findOne({ where: { id } })
      .then((d) =>
        !noticiaEntity ? d : !!d && noticiaEntity.id === d.id ? d : null,
      );
    if (!noticia)
      throw new NotFoundException('Noticia no existe o no está autorizado');
    return noticia;
  }

  async createNoticia(dto: CreateNoticiaDto) {
    const noticiaExiste = await this.noticiaRepository.findOne({
      where: { titulo: dto.titulo },
    });
    if (noticiaExiste)
      throw new BadRequestException('Noticia ya registrada con ese nombre');

    const nuevaNoticia = this.noticiaRepository.create(dto);
    const noticia = await this.noticiaRepository.save(nuevaNoticia);

    return noticia;
  }

  async editNoticia(id: number, dto: EditNoticiaDto, noticiaEntity?: Noticia) {
    const noticia = await this.getById(id, noticiaEntity);
    const noticiaEditado = Object.assign(noticia, dto);
    return await this.noticiaRepository.save(noticiaEditado);
  }

  async deleteNoticia(id: number, noticiaEntity?: Noticia) {
    const noticia = await this.getById(id, noticiaEntity);
    return await this.noticiaRepository.remove(noticia);
  }

  async findOne(data: NoticiaFindOne) {
    return await this.noticiaRepository
      .createQueryBuilder('noticia')
      .where(data)
      .addSelect('noticia.titulo')
      .getOne();
  }
}
