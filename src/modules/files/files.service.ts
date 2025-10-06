import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import sizeOf from 'image-size';
import { FindOptionsWhere, Repository, FindOptionsSelect, Like } from 'typeorm';
import { File } from './entity';
import { StorageService } from '../storage/storage.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly storageService: StorageService,
  ) {}

  async getById(id: number, fileEntity?: File) {
    const file = await this.fileRepository
      .findOne({ where: { id } })
      .then((d) =>
        !fileEntity ? d : !!d && fileEntity.id === d.id ? d : null,
      );
    if (!file)
      throw new NotFoundException('File no existe o no está autorizado');
    return file;
  }

  async createFile(
    file: any,
    s3url: string,
    nameFile: string,
    usuario_id: number,
  ) {
    let width: number = null;
    let height: number = null;

    if (file.mimetype.includes('image')) {
      const dimensions = sizeOf(file.buffer);
      width = dimensions.width;
      height = dimensions.height;
    }

    let fileDto = {
      nombre: nameFile,
      width,
      height,
      originalname: file.originalname,
      mimetype: file.mimetype,
      s3url,
      usuario_id,
    };

    const nuevoFile = this.fileRepository.create(fileDto);
    const _file = await this.fileRepository.save(nuevoFile);

    return _file;
  }

  // Metodo para subir multiples archivos
  async createMultipleFiles(
    files: any[],
    namesFiles: string[],
    usuario_id: number,
  ) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const s3url = await this.storageService.upload(file);
      await this.createFile(file, s3url, namesFiles[i], usuario_id);
    }
  }

  async deleteFile(id: number, fileEntity?: File) {
    const file = await this.getById(id, fileEntity);
    return await this.fileRepository.remove(file);
  }

  // Obtener archivos paginados
  paginacionFiles(
    options: IPaginationOptions,
    slug: string,
    busqueda: string,
    sort: string,
  ): Observable<Pagination<File>> {
    // const relations = ['user.facultad'];

    let _where: FindOptionsWhere<File> = {};

    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _select: FindOptionsSelect<File> = {
      id: true,
      nombre: true,
      s3url: true,
      width: true,
      height: true,
      created_at: true,
      user: {
        facultad: {
          slug: true,
        },
      },
    };

    if (slug) {
      _where = {
        user: { facultad: { slug } },
      };
    }

    if (busqueda) {
      _where = {
        ..._where,
        nombre: Like(`%${busqueda}%`),
      };
    }

    return from(
      this.fileRepository.findAndCount({
        where: _where,
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
      }),
    ).pipe(
      map(([files, totalFiles]) => {
        const filesPageable: Pagination<File> = {
          items: files,
          meta: {
            currentPage: Number(options.page),
            itemCount: files.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalFiles,
            totalPages: Math.ceil(totalFiles / Number(options.limit)),
          },
        };
        return filesPageable;
      }),
    );
  }
}
