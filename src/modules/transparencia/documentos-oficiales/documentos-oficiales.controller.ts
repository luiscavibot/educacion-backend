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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('documentos-oficiales')
@ApiTags('Documentos Oficiales')
export class DocumentosOficialesController {
  constructor(
    private readonly documentoOficialService: DocumentosOficialesService,
  ) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todos los documentos oficiales por paginacion de una facultad ',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'SLUG de la facultad a la que pertenecen los documentos oficiales',
})
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
  @ApiOperation({
    description: 'Devuelve una lista de todos los años de los documentos oficiales',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'SLUG de la faucltad para filtrar los documentos oficiales',
  })
  yearsDocumentosOficiales(@Param('slug', new DefaultValuePipe('')) slug: string): Observable<any> {
    return this.documentoOficialService.yearsDocumentosOficiales(slug);
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un documento oficial dado un Id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del documento oficial',
  })
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
  @ApiOperation({
    description: 'Crea un documento oficial',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha creado correctamente',
  })
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
  @ApiOperation({
    description: 'Actualiza un documento oficial',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha actualizado correctamente',
  })
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
  @ApiOperation({
    description: 'Borra un documento oficial dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del documento oficial',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado un documento oficial correctamente',
  })
  async deleteDocumentoOficial(@Param('id') id: number) {
    let data;
    data = await this.documentoOficialService.deleteDocumentoOficial(id);
    return { message: 'Documento oficial eliminado', data };
  }
}
