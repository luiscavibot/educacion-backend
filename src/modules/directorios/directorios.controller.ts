import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DirectoriosService } from './directorios.service';
import { CreateDirectorioDto, EditDirectorioDto } from './dtos';
import { Observable } from 'rxjs';
import { Directorio } from './entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('directorios')
@ApiTags('Directorios')
export class DirectoriosController {
  constructor(private readonly directorioService: DirectoriosService) {}

  @ApiOperation({
    description: 'Devuelve un registro del directorio por ID',
  })
  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.directorioService.getById(id);
    return { data };
  }

  @ApiOperation({
    description: 'Devuelve todos los registros del directorio por facultad',
  })
  @Get(':slug')
  directoriosPorFacultad(@Param('slug') slug: string, @Query('search') search: string): Observable<Directorio[]> {
    return this.directorioService.directoriosPorFacultad(slug, search);
  }

  @ApiOperation({
    description: 'Devuelve todos los registros del directorio por facultad por paginacion',
  })
  @Get('paginacion/:slug')
  directoriosPorPaginacion(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Query('sort') sort: string,
    @Param('slug', new DefaultValuePipe('')) slug: string,
  ): Observable<Pagination<Directorio>> {
    limit = limit > 100 ? 100 : limit;
    return this.directorioService.paginacionDirectorio(
      {
              limit,
              page,
      },
      slug,
      sort
    );
  }

  @ApiOperation({
    description: 'Crea un nuevo registro en el directorio',
  })
  @ApiResponse({
    status: 201,
    description: 'Registro creado en el directorio correctamente',
  })
  @ApiBody({
    description: 'Crea un nuevo registro en el directorio usando un DirectorioDto',
    type: CreateDirectorioDto,
    examples: {
      ejemplo1: {
        value: {
          unidad: 'Unidad',
          cargo: 'cargo',
          nombre: 'nombre',
          anexo: 'anexo',
          correos: 'ejemplo@gmail.com',
          estado: false,
          carreraId: 2,
          orden: 120,
        },
      },
    },
  })
  @Post()
  async createDirectorio(@Body() dto: CreateDirectorioDto) {
    const data = await this.directorioService.CreateDirectorio({ ...dto });
    return { message: 'Directorio creado', data };
  }

  @ApiBody({
    description: 'Actualiza un registro en el directorio usando un DirectorioDto',
    type: CreateDirectorioDto,
    examples: {
      ejemplo1: {
        value: {
          correos: 'ejemplo@gmail.com,ejemplo2@gmail.com',
          estado: false,
          carreraId: 2,
          orden: 121,
        },
      },
    },
  })
  @Put(':id')
  async editDocente(@Param('id') id: number, @Body() dto: EditDirectorioDto) {
    let data;
    data = await this.directorioService.editDirectorio(id, dto);
    return { message: 'Directorio editado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a un registro del directorio dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el registro correctamente',
  })
  @Delete(':id')
  async deleteDocente(@Param('id') id: number) {
    let data;
    data = await this.directorioService.deleteDirectorio(id);
    return { message: 'Directorio eliminado', data };
  }
}
