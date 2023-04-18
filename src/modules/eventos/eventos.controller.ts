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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventoService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { EditEventoDto } from './dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Evento } from './entity/evento.entity';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseBoolPipe } from '@nestjs/common/pipes';

@Controller('eventos')
@ApiTags('Eventos')
export class EventosController {
  constructor(private readonly eventoService: EventoService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve la paginación de todos los eventos de una facultad',
  })
  @ApiQuery({
    name: 'vigentes',
    type: Boolean,
    required: false,
    description: 'Filtra eventos por la fecha hoy.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Muestra eventos en la página indicada.',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limita la cantidad de eventos por página.',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: 'Ordena los enventos según el criterio indicado.',
  })
  @ApiQuery({
    name: 'estado',
    type: Boolean,
    required: false,
    description: 'Muestra los eventos publicados.',
  })
  @ApiQuery({
    name: 'fechaInicio',
    type: String,
    required: false,
    description: 'Filtra eventos indicando la fecha de inicio.',
  })
  @ApiQuery({
    name: 'fechaFin',
    type: String,
    required: false,
    description: 'Filtra eventos indicando la fecha de fin.',
  })
  getAllEventosFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Query('sort') sort: string,
    @Query('estado', new DefaultValuePipe(false), ParseBoolPipe) estado: boolean = false,
    @Query('fechaInicio') inicio: string,
    @Query('fechaFin') fin: string,
    @Query('vigentes', new DefaultValuePipe(false), ParseBoolPipe) vigentes: boolean = false,
    @Query('noVigentes', new DefaultValuePipe(false), ParseBoolPipe) noVigentes: boolean = false,
    @(Param('slug')!) slug: string,
  ): Observable<Pagination<Evento>> {
    limit = limit > 100 ? 100 : limit;
    return this.eventoService.paginacionEventos(
      {
        limit,
        page,
      },
      slug,
      sort,
      inicio,
      fin,
      vigentes,
      noVigentes,
      estado,
    );
  }

  @Get(':slug/:_id/ultimos')
  @ApiOperation({
    description: 'Devuelve los próximos 3 eventos vigentes después del evento con el id indicado',
  })
  ultimasEventos(@Param('slug') slug: string, @Param('_id') _id: number): Observable<Evento[]> {
    return this.eventoService.ultimosEventos(slug, _id);
  }

  @Get(':slug/ultimos-destacados')
  @ApiOperation({
    description: 'Devuelve los últimos 3 eventos destacados vigentes',
  })
  ultimasEventosDestacados(@Param('slug') slug: string): Observable<Evento[]> {
    return this.eventoService.ultimosEventosDestacados(slug);
  }
  @Get(':slug/ultimos-vigentes')
  @ApiOperation({
    description: 'Devuelve los últimos 3 eventos vigentes',
  })
  ultimasEventosVigentes(@Param('slug') slug: string): Observable<Evento[]> {
    return this.eventoService.ultimosEventosVigentes(slug);
  }

  @Get(':slug/ultimos-no-vigentes')
  @ApiOperation({
    description: 'Devuelve los últimos 3 eventos no vigentes',
  })
  ultimasEventosNoVigentes(@Param('slug') slug: string): Observable<Evento[]> {
    return this.eventoService.ultimosEventosNoVigentes(slug);
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un evento dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del evento',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.eventoService.getById(id);
    return { data };
  }

  @Get('url/:slug')
  getEventoBySlug(@Param('slug') slug: string): Observable<Evento[]> {
    return this.eventoService.getEventoBySlug(slug);
  }

  @Get('tipos/tipos-eventos')
  getTipos() {
    const tipos = this.eventoService.tipoEventos();
    return { tipos };
  }

  @Post()
  @ApiOperation({
    description: 'Crea un nuevo evento',
  })
  @ApiResponse({
    status: 201,
    description: 'Evento creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El evento existe`,
  })
  @ApiBody({
    description: 'Crea un nuevo evento usando un EventoDto',
    type: CreateEventoDto,
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
  async createEvento(@Body() dto: CreateEventoDto, @UploadedFile() file) {
    if (file) {
      dto.foto = file.originalname;
    }
    const data = await this.eventoService.createEvento({ ...dto }, file);
    return { message: 'Evento creado', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza un evento',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del evento',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza un evento usando una EventoDto',
    type: EditEventoDto,
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
  async editEvento(
    @Param('id') id: number,
    @Body() dto: EditEventoDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.foto = file.originalname;
    }
    let data;
    data = await this.eventoService.editEvento(id, dto, file);
    return { message: 'Evento editado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra un evento dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del evento',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el evento correctamente',
  })
  async deleteEvento(@Param('id') id: number) {
    let data;
    data = await this.eventoService.deleteEvento(id);
    return { message: 'Evento eliminado', data };
  }
}