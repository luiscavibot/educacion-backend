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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dtos/create-noticia.dto';
import { EditNoticiaDto } from './dtos';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Noticia } from './entity/noticia.entity';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('noticias')
@ApiTags('noticias')
export class NoticiasController {
  constructor(private readonly noticiaService: NoticiasService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todas las noticias de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  getAllNoticiasFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort') sort: string,
    @Query('estado') estado: string,
    // @Query('ref') ref: string,
  ): Observable<Pagination<Noticia>> {
    limit = limit > 100 ? 100 : limit;
    return this.noticiaService.paginacionNoticias(
      {
        limit,
        page,
      },
      slug,
      sort,
      estado,
    );
  }

  @Get(':slug/ultimas-home')
  @ApiOperation({
    description: 'Devuelve las ultimas noticias (3)',
  })
  ultimasNoticiasHome(@Param('slug') slug: string): Observable<Noticia[]> {
    return this.noticiaService.ultimasNoticiasHome(slug);
  }
  @Get(':slug/ultimas')
  @ApiOperation({
    description: 'Devuelve las ultimas noticias (3)',
  })
  ultimasNoticias(@Param('slug') slug: string): Observable<Noticia[]> {
    return this.noticiaService.ultimasNoticias(slug);
  }

  @Get(':slug/destacadas')
  @ApiOperation({
    description: 'Devuelve las noticias destacadas',
  })
  destacadasNoticias(@Param('slug') slug: string): Observable<Noticia[]> {
    return this.noticiaService.destacadasNoticias(slug);
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve una noticia dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la noticia',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.noticiaService.getById(id);
    return { data };
  }

  @Get('url/:slug')
  getNoticiaBySlug(@Param('slug') slug: string): Observable<Noticia[]> {
    return this.noticiaService.getNoticiaBySlug(slug);
  }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva noticia',
  })
  @ApiResponse({
    status: 201,
    description: 'Noticia creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La noticia existe`,
  })
  @ApiBody({
    description: 'Crea una nueva noticia usando una NoticiaDto',
    type: CreateNoticiaDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Facultad demo 1',
          areaId: '1',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'Facultad demo 2',
          areaId: '1',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async createNoticia(
    @Body() dto: CreateNoticiaDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.noticiaService.createNoticia({ ...dto }, file);
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
    description: 'Actualiza una noticia',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la noticia',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una noticia usando una NoticiaDto',
    type: EditNoticiaDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Example 1',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'Example 2',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async editNoticia(
    @Param('id') id: number,
    @Body() dto: EditNoticiaDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.foto = file.originalname;
    }
    let data;
    data = await this.noticiaService.editNoticia(id, dto, file);
    return { message: 'Noticia editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una noticia dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la noticia',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la noticia correctamente',
  })
  async deleteNoticia(@Param('id') id: number) {
    let data;
    data = await this.noticiaService.deleteNoticia(id);
    return { message: 'Noticia eliminada', data };
  }
}
