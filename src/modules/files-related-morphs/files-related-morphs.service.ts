import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFileRelatedMorphDto, EditFileRelatedMorphDto } from './dtos';
import { FileRelatedMorph } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesRelatedMorphsService {

    constructor(
        @InjectRepository(FileRelatedMorph)
        private readonly fileRelatedMorphRepository: Repository<FileRelatedMorph>
    ){}

    async getById(id: number, fileRelatedMorphEntity?: FileRelatedMorph) {
        const fileRelatedMorph = await this.fileRelatedMorphRepository
          .findOne({ where: { id } })
          .then((d) =>
            !fileRelatedMorphEntity ? d : !!d && fileRelatedMorphEntity.id === d.id ? d : null,
          );
        if (!fileRelatedMorph)
          throw new NotFoundException('FileRelatedMorph no existe o no está autorizado');
        return fileRelatedMorph;
    }

    async getFileRelatedMorph(filter: { related_id: number; related_type: string; }){
      return this.fileRelatedMorphRepository.find({ where: filter });
    }

    // Obtener si existen varias relaciones en un file
    async checkIfFileIsRelatedToOthers(fileId: number) {
      const relatedFiles = await this.fileRelatedMorphRepository.find({
        where: { file_id: fileId }
      });
  
      return relatedFiles.length > 1;
  }

    async createFileRelatedMorph(
        dto: any
      ): Promise<FileRelatedMorph> {

        const fileRelatedMorphDto: CreateFileRelatedMorphDto = {
          file_id: dto.file_id,
          related_id:dto.related_id,
          related_type: dto.related_type,
          order: dto.order
        }
        const nuevoFileRelatedMorph = this.fileRelatedMorphRepository.create(fileRelatedMorphDto);
        return await this.fileRelatedMorphRepository.save(nuevoFileRelatedMorph);
      }

    async editFileRelatedMorph(
        id: number,
        dto: EditFileRelatedMorphDto,
        fileRelatedMorphEntity?: FileRelatedMorph,
    ) {
        const fileRelatedMorph = await this.getById(id, fileRelatedMorphEntity);
        const fileRelatedMorphEditado = Object.assign(fileRelatedMorph, dto);
        return await this.fileRelatedMorphRepository.save(fileRelatedMorphEditado);
    }

    async deleteFileRelatedMorph(id: number, fileRelatedMorphEntity?: FileRelatedMorph) {
        const fileRelatedMorph = await this.getById(id, fileRelatedMorphEntity);
        return await this.fileRelatedMorphRepository.remove(fileRelatedMorph);
    }

}
