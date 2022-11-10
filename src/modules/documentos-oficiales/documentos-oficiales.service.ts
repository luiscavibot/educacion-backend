import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, Like, FindOptionsSelect } from 'typeorm';
import { DocumentoOficial } from './entity';
import { StorageService } from '../storage/storage.service';
import { EditDocumentoOficialDto } from './dtos/edit-documento-oficial.dto';
import { fileFilterName } from '../../helpers/fileFilerName.helpers';
import { CreateDocumentoOficialDto } from './dtos/create-documento-oficial.dto';
import { Observable, from, map, distinct } from 'rxjs';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { YearsDocumentosOfiales } from './const';

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
        order: { anio: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          estado: true,
        },
      }),
    ).pipe(
      map((documentosOficiales: DocumentoOficial[]) => documentosOficiales),
    );
  }

  yearsDocumentosOficiales(slug: string){
    return from(
      this.documentoOficialRepository.find({
        order: { anio: 'DESC' },
        where: {
          facultad: {
            slug,
          },
          estado: true,
        },
      }),
    ).pipe(map(( documentosOficiales ) => {
      let _years = new Set();
      documentosOficiales.forEach( (d) =>{
        _years.add(`${d.anio}`)
      })
      let years = [..._years]
      return years.sort();
    })
    );
  }
  
  paginacionDocumentosOficiales(
    options: IPaginationOptions,
    slug: string,
    sort: string,
    anio: string,
    estado: string,
    query: string,
  ): Observable<Pagination<DocumentoOficial>> {
    let order_by = sort?.split(':')[0] || 'id';
    let direction = sort?.split(':')[1] || 'DESC';
    let _where: FindOptionsWhere<DocumentoOficial>[] = [{
      facultad: { slug },
    }];

    let _select: FindOptionsSelect<DocumentoOficial> = {
      id: true,
      nombre: true,
      estado: true,
    };

    if (estado == 'true') {
      _select = {
        id: true,
        nombre: true,
        archivo: true,
        anio: true,
      };
      _where = [{ facultad: { slug }, estado: true }];
    }

    if (anio) {
      _where = [{ facultad: { slug }, estado: true, anio }];
    }
    if (query) {
      _where = [{ facultad: { slug }, estado: true, nombre: Like(`%${query}%`) }];
    }

    if(anio && query){
      _where = [{ facultad: { slug }, estado: true,anio, nombre: Like(`%${query}%`) }];
    }

    return from(
      this.documentoOficialRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 3,
        order: { [order_by]: direction },
        select: _select,
        where: _where,
      }),
    ).pipe(
      map(([documentosOficiales, totalDocumentosOficiales]) => {
        const documentosOficialesPageable: Pagination<DocumentoOficial> = {
          items: documentosOficiales,
          meta: {
            currentPage: Number(options.page),
            itemCount: documentosOficiales.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalDocumentosOficiales,
            totalPages: Math.ceil(
              totalDocumentosOficiales / Number(options.limit),
            ),
          },
        };
        return documentosOficialesPageable;
      }),
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
      const nombre_archivo = fileFilterName(file, hash);
      if (!nombre_archivo) {
        throw new BadRequestException('Archivo no válido');
      }
      let { Location } = await this.storageService.uploadFile(
        file,
        nombre_archivo,
      );
      dto.archivo = Location;
      dto.fileName = file.originalname;
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
      dto.fileName = file.originalname;
    }

    const documentoOficialEditado = Object.assign(documentoOficial, dto);
    return await this.documentoOficialRepository.save(documentoOficialEditado);
  }

  async deleteDocumentoOficial(
    id: number,
    documentoOficialEntity?: DocumentoOficial,
  ) {
    const documentoOficial = await this.getById(id, documentoOficialEntity);
    if (documentoOficial.archivo != '') {
      await this.storageService.deleteFile(documentoOficial.archivo);
    }
    return await this.documentoOficialRepository.remove(documentoOficial);
  }

  yearsDocumentosOfiales() {
    return YearsDocumentosOfiales.map( year => year );
  }
}
