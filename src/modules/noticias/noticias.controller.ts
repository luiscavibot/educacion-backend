import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dtos/create-noticia.dto';
import { EditNoticiaDto } from './dtos';
import { PaginationQueryDto } from './dtos/pagination-query.dto';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';
import { Noticia } from './entity/noticia.entity';
import { Observable } from 'rxjs';

@Controller('noticias')
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
  ): Observable<Pagination<Noticia>> {
    limit = limit > 100 ? 100 : limit;
    return this.noticiaService.paginacionNoticias(
      {
        limit,
        page,
      },
      slug,
    );
  }

  @Get(':slug/ultimas')
  @ApiOperation({
    description: 'Devuelve las noticias ultimas 4 noticias',
  })
  ultimasNoticias(@Param('slug') slug: string): Observable<Noticia[]> {
    return this.noticiaService.ultimasNoticias(slug);
  }

  @Get(':id')
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
    description: `La notcia existe`,
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
  async createNoticia(@Body() dto: CreateNoticiaDto) {
    const data = await this.noticiaService.createNoticia({ ...dto });
    return { message: 'Noticia creada', data };
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
  async editNoticia(@Param('id') id: number, @Body() dto: EditNoticiaDto) {
    let data;
    data = await this.noticiaService.editNoticia(id, dto);
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
