import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@Controller('documentos-oficiales')
@ApiTags('Documentos Oficiales')
export class DocumentosOficialesController {
  constructor(
    private readonly documentoOficialService: DocumentosOficialesService,
  ) {}

  @Get(':slug')
  documentosOficialesPorFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort') sort: string,
    @Query('anio') anio: string,
    @Query('estado') estado: string,
    @Query('query') query: string,
  ): Observable<Pagination<DocumentoOficial>> {
    limit = limit > 100 ? 100 : limit;
    return this.documentoOficialService.paginacionDocumentosOficiales(
      {
        limit,
        page,
      },
      slug,
      sort,
      anio,
      estado,
      query,
    );
  }

  @Get(':slug/years')
  yearsDocumentosOficiales(@Param('slug', new DefaultValuePipe('')) slug: string): Observable<any> {
    return this.documentoOficialService.yearsDocumentosOficiales(slug);
  }

  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.documentoOficialService.getById(id);
    return { data };
  }

  @Get('years/years-documentos-oficiales')
  getYears() {
    const years = this.documentoOficialService.yearsDocumentosOfiales();
    return { years };
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
