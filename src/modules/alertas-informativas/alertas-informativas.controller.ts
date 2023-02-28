import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { AlertasInformativasService } from './alertas-informativas.service';
import { CreateAlertaInformativaDto, EditAlertaInformativaDto } from './dtos';
import { AlertaInformativa } from './entity';

@Controller('alertas-informativas')
@ApiTags('Alertas informativas')
export class AlertasInformativasController {
  constructor(private readonly alertaInformativaService: AlertasInformativasService) { }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva alerta informativa',
  })
  @ApiResponse({
    status: 201,
    description: 'Alerta informativa creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La alerta informativa existe`,
  })
  @ApiBody({
    description: 'Crea una nueva alerta informativa usando una AlertaInformativaDto',
    type: CreateAlertaInformativaDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: "Nueva alerta",
          descripcion: "Descripcion",
          usuario_id: 0
        },
      },
      ejemplo2: {
        value: {
          titulo: "Nueva alerta",
          url: "url",
          usuario_id: 0
        },
      },
      ejemplo3: {
        value: {
          titulo: "Nueva alerta",
          descripcion: "descripcion",
          url: "url",
          usuario_id: 0
        },
      },
    },
  })
  async createAlertaInformativa(
    @Body() dto: CreateAlertaInformativaDto,
    @Res() response
  ) {
    try {
      const data = await this.alertaInformativaService.createAlertaInformativa({ ...dto });
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

  @Get(':slug/publicada')
  @ApiOperation({
    description: 'Devuelve la alerta informativa publicada de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  async getAlertaInformativaPublicada(
    @Param('slug') slug: string): Promise<AlertaInformativa> {
    const alertaInformativa = await this.alertaInformativaService.getAlertaInformativaPublicada(slug);
    return alertaInformativa;
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve una alerta informativa dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la alerta informativa',
  })
  async getAlertaInformativaById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.alertaInformativaService.getAlertaInformativaById(id);
    return { data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza y publica una alerta informativa',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la alerta informativa',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una alerta informativa usando una AlertaInformativaDto',
    type: EditAlertaInformativaDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: 'Ejemplo 1',
        },
      },
      ejemplo2: {
        value: {
          titulo: 'Ejemplo 2',
        },
      },
    },
  })
  async editAlertaInformativa(
    @Param('id') id: number,
    @Body() dto: EditAlertaInformativaDto,
  ) {

    let data;
    data = await this.alertaInformativaService.editAlertaInformativa(id, dto);
    return { message: 'Alerta informativa actualizada y publicada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una alerta informativa dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la alerta informativa',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la alerta informativa correctamente',
  })
  async deleteAlertaInformativa(@Param('id') id: number) {
    let data;
    data = await this.alertaInformativaService.deleteAlertaInformativa(id);
    return { message: 'Alerta informativa eliminada', data };
  }

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todas las alertas informativas de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  getAlertasInformativas(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort', new DefaultValuePipe('')) sort: string
  ): Observable<Pagination<AlertaInformativa>> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      limit,
      page,
    };
    const sortParam = sort ? sort : undefined;
    return this.alertaInformativaService.getPaginacionAlertasInformativas(options, slug, sortParam);
  }

}