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
} from '@nestjs/common';
import { CreateTramiteDto } from './dtos';
import { TramitesService } from './tramites.service';
import { EditTramiteDto } from './dtos/edit-tramite.dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Tramite } from './entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('tramites')
@ApiTags('Trámites')
export class TramitesController {
  constructor(private readonly tramiteService: TramitesService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todos los trámites por paginacion de una facultad ',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'SLUG de la facultad a la que pertenecen los trámites',
  })
  getAllTramitesFacultad(
    @Query('targetProject') targetProject: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort') sort: string,
    @Query('estado') estado: string,
    @Query('tipos') tipos: string | string[],
    @Query('query') query: string = '',
  ): Observable<Pagination<Tramite>> {
    if (typeof tipos === 'string') {
      tipos = [tipos];
    }
    limit = limit > 100 ? 100 : limit;
    return this.tramiteService.paginacionTramites(
      {
        limit,
        page,
      },
      slug,
      sort,
      estado,
      tipos,
      query,
      targetProject,
    );
  }

  @Post()
  @ApiOperation({
    description: 'Crea un trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha creado correctamente',
  })
  @ApiBody({
    description: 'crea un nuevo tramite usando un tramiteDto',
    type: CreateTramiteDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: 'tramite 1',
          descripcion: 'descripcion de prueba',
          usuario_id: 1,
        },
      },
      ejemplo2: {
        value: {
          titulo: 'tramite 2',
          descripcion: 'descripcion de prueba 2',
          usuario_id: 1,
        },
      },
    },
  })
  async createTramite(@Body() dto: CreateTramiteDto, @Res() response) {
    try {
      const data = await this.tramiteService.createTramite({ ...dto });
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

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un tramite dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de un tramite',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tramiteService.getById(id);
    return { data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza y publica un trámite',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'actualiza un tramite usando un tramiteDto',
    type: EditTramiteDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: 'tramite 1',
          descripcion: 'descripcion de prueba',
        },
      },
      ejemplo2: {
        value: {
          titulo: 'tramite 2',
          descripcion: 'descripcion de prueba 2',
        },
      },
    },
  })
  async editTramite(@Param('id') id: number, @Body() dto: EditTramiteDto) {
    let data;
    data = await this.tramiteService.editTramite(id, dto);
    return { message: 'Tramite editado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra un trámite dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del trámite',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado un trámite correctamente',
  })
  async deleteTramite(@Param('id') id: number) {
    let data;
    data = await this.tramiteService.deleteTramite(id);
    return { message: 'Tramite eliminado', data };
  }
}
