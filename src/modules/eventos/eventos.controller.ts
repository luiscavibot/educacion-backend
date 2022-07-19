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

@Controller('eventos')
@ApiTags('eventos')
export class EventosController {
  constructor(private readonly eventoService: EventoService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todas las eventos de una facultad paginados',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  getAllEventosFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @(Param('slug')!) slug: string,
  ): Observable<Pagination<Evento>> {
    limit = limit > 100 ? 100 : limit;
    return this.eventoService.paginacionEventos(
      {
        limit,
        page,
      },
      slug,
    );
  }

  @Get(':slug/ultimos')
  @ApiOperation({
    description: 'Devuelve los ultimos 4 eventos',
  })
  ultimasEventos(@Param('slug') slug: string): Observable<Evento[]> {
    return this.eventoService.ultimosEventos(slug);
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve una evento dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la evento',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.eventoService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva evento',
  })
  @ApiResponse({
    status: 201,
    description: 'Evento creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El evento existe`,
  })
  @ApiBody({
    description: 'Crea una nueva evento usando una EventoDto',
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
    console.log(file);
    if (file) {
      dto.foto = file.originalname;
    }
    const data = await this.eventoService.createEvento({ ...dto }, file);
    return { message: 'Evento creado', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza una evento',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la evento',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una evento usando una EventoDto',
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
  async editEvento(@Param('id') id: number, @Body() dto: EditEventoDto) {
    let data;
    data = await this.eventoService.editEvento(id, dto);
    return { message: 'Evento editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una evento dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la evento',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la evento correctamente',
  })
  async deleteEvento(@Param('id') id: number) {
    let data;
    data = await this.eventoService.deleteEvento(id);
    return { message: 'Evento eliminada', data };
  }
}
