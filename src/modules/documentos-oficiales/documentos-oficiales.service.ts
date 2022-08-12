import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentoOficial } from './entity';
import { StorageService } from '../storage/storage.service';
import { EditDocumentoOficialDto } from './dtos/edit-documento-oficial.dto';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { CreateDocumentoOficialDto } from './dtos/create-documento-oficial.dto';
import { Observable, from, map } from 'rxjs';

@Injectable()
export class DocumentosOficialesService {
  constructor(
    @InjectRepository(DocumentoOficial)
    private readonly documentoOficialRepository: Repository<DocumentoOficial>,
    private readonly storageService: StorageService,
  ) {}

  documentosOficialesPorFacultad(slug: string): Observable<DocumentoOficial[]> {
    return from(
      this.documentoOficialRepository.find({
        take: 3,
        order: { created_at: 'DESC' },
        where: {
          //   facultad: {
          //     slug,
          //   },
          //   destacado: true,
        },
      }),
    ).pipe(
      map((documentosOficiales: DocumentoOficial[]) => documentosOficiales),
    );
  }

  async getById(id: number, documentoOficialEntity?: DocumentoOficial) {
    const documentoOficial = await this.documentoOficialRepository
      .findOne({ where: { id } })
      .then((d) =>
        !documentoOficialEntity
          ? d
          : !!d && documentoOficialEntity.id === d.id
          ? d
          : null,
      );
    if (!documentoOficial)
      throw new NotFoundException(
        'Documento oficial no existe o no está autorizado',
      );
    return documentoOficial;
  }

  async createDocumentoOficial(dto: CreateDocumentoOficialDto, file: any) {
    const hash = Date.now().toString();

    if (file) {
      const nombre_foto = fileFilterName(file, hash);
      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.archivo = Location;
    }
    const nuevoDocumentoOficial = this.documentoOficialRepository.create(dto);
    const documentoOficial = await this.documentoOficialRepository.save(
      nuevoDocumentoOficial,
    );

    return { documentoOficial };
  }

  async editDocumentoOficial(
    id: number,
    dto: EditDocumentoOficialDto,
    file: any,
    documentoOficialEntity?: DocumentoOficial,
  ) {
    const documentoOficial = await this.getById(id, documentoOficialEntity);
    if (documentoOficial.archivo != '' && file) {
      if (file) {
        await this.storageService.deleteFile(documentoOficial.archivo);
      }
    }

    if (file) {
      const hash = Date.now().toString();
      const nombre_foto = fileFilterName(file, hash);

      if (!nombre_foto) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_foto,
      );
      dto.archivo = Location;
    }

    const documentoOficialEditado = Object.assign(documentoOficial, dto);
    return await this.documentoOficialRepository.save(documentoOficialEditado);
  }

  async deleteDocumentoOficial(
    id: number,
    documentoOficialEntity?: DocumentoOficial,
  ) {
    const noticia = await this.getById(id, documentoOficialEntity);
    return await this.documentoOficialRepository.remove(noticia);
  }
}
