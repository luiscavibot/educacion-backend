import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentosOficialesService } from './documentos-oficiales.service';
import { Observable } from 'rxjs';
import { DocumentoOficial } from './entity/documento-oficial.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateDocumentoOficialDto } from './dtos/create-documento-oficial.dto';
import { EditDocumentoOficialDto } from './dtos';

@Controller('documentos-oficiales')
export class DocumentosOficialesController {
  constructor(
    private readonly documentoOficialService: DocumentosOficialesService,
  ) {}

  @Get(':slug')
  documentosOficialesPorFacultad(
    @Param('slug') slug: string,
  ): Observable<DocumentoOficial[]> {
    return this.documentoOficialService.documentosOficialesPorFacultad(slug);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createDocumentoOficial(
    @Body() dto: CreateDocumentoOficialDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.documentoOficialService.createDocumentoOficial(
        { ...dto },
        file,
      );
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Creación exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al crear registro',
        error: error.message,
      });
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async editDocumentoOficial(
    @Param('id') id: number,
    @Body() dto: EditDocumentoOficialDto,
    @UploadedFile() file,
  ) {
    let data;
    data = await this.documentoOficialService.editDocumentoOficial(
      id,
      dto,
      file,
    );
    return { message: 'Documento oficial editado', data };
  }

  @Delete(':id')
  async deleteDocumentoOficial(@Param('id') id: number) {
    let data;
    data = await this.documentoOficialService.deleteDocumentoOficial(id);
    return { message: 'Documento oficial eliminado', data };
  }
}
