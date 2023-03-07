import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateEgresadoDto, EditEgresadoDto } from './dtos';
import { EgresadosService } from './egresados.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Egresado } from './entity/egresado.entity';

@Controller('egresados')
@ApiTags('Egresados')
export class EgresadosController {
  constructor(private readonly egresadoService: EgresadosService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todos los egresados de una carrera',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la carrera',
  })
  getAllNoticiasFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
  ): Observable<Pagination<Egresado>> {
    limit = limit > 100 ? 100 : limit;
    return this.egresadoService.paginacionEgresados(
      {
        limit,
        page,
      },
      slug,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createNoticia(
    @Body() dto: CreateEgresadoDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.egresadoService.createEgresado({ ...dto }, file);
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Creación exitosa',
        data,
      });

      return { message: 'egresado creado', data };
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al crear registro',
        error: error.message,
      });
    }
  }

  @UseInterceptors(FileInterceptor('file'))
  async editNoticia(
    @Param('id') id: number,
    @Body() dto: EditEgresadoDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.foto = file.originalname;
    }
    let data;
    data = await this.egresadoService.editEgresado(id, dto, file);
    return { message: 'Egresado editado', data };
  }
}
