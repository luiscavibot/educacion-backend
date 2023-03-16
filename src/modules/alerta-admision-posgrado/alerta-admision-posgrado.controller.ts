import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlertaAdmisionPosgradoService } from './alerta-admision-posgrado.service';
import { CreateAlertaAdmisionPosgradoDto, EditAlertaAdmisionPosgradoDto } from './dtos';
import { AlertaAdmisionPosgrado } from './entity';

@Controller('alertas-admision-posgrado')
@ApiTags('Alertas Admisión Posgrado')
export class AlertaAdmisionPosgradoController {
  constructor(private readonly alertaAdmisionPosgradoService: AlertaAdmisionPosgradoService) { }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva alerta admisión posgrado',
  })
  @ApiResponse({
    status: 201,
    description: 'alerta admisión posgrado creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La alerta admisión posgrado existe`,
  })
  @ApiBody({
    description: 'Crea una nueva alerta admisión posgrado usando una AlertaInformativaDto',
    type: CreateAlertaAdmisionPosgradoDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: "Nueva alerta",
          usuario_id: 1
        },
      },
      ejemplo2: {
        value: {
          titulo: "Nueva alerta",
          usuario_id: 1,
          descripcion: 'Nueva descripción',
          ciclo: '2023-I'
        },
      },
      ejemplo3: {
        value: {
          titulo: "Nueva alerta",
          usuario_id: 1,
          descripcion: 'Nueva descripción',
          ciclo: '2023-I',
          fecha_inicio: '2023-01-01',
          fecha_fin: '2023-12-31'
        },
      },
    },
  })
  async createAlertaAdmisionPosgrado(
    @Body() dto: CreateAlertaAdmisionPosgradoDto,
    @Res() response
  ) {
    try {
      const data = await this.alertaAdmisionPosgradoService.createAlertaAdmisionPosgrado({ ...dto });
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

  @Put(':slug/editar')
  @ApiOperation({
    description: 'Actualiza una alerta de admisión posgrado',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una alerta de admisión posgrado usando una AlertaAdmisionPosgradoDto',
    type: EditAlertaAdmisionPosgradoDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: 'Título de alerta editado',
          descripcion: 'Alerta de admisión posgrado editada',
          ciclo: '2023-I',
          publicado: 0,
          fecha_inicio: '2023-01-01',
          fecha_fin: '2023-12-31'
        },
      }
    },
  })
  async editAlertaAdmisionPosgrado(
    @Param('slug') slug: string,
    @Body() dto: EditAlertaAdmisionPosgradoDto,
  ) {

    let data;
    data = await this.alertaAdmisionPosgradoService.editAlertaAdmisionPosgrado(slug, dto);
    return { message: 'Alerta de admisión posgrado actualizada', data };
  }

  @Get(':slug/vigente')
  @ApiOperation({
    description: 'Devuelve la alerta de admisión posgrado vigente de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  async getAlertaAdmisionPosgradoVigente(
    @Param('slug') slug: string
  ): Promise<AlertaAdmisionPosgrado> {
    const alertaAdmisionPosgrado = await this.alertaAdmisionPosgradoService.getAlertaAdmisionPosgradoVigente(slug);
    return alertaAdmisionPosgrado;
  }

  @Delete(':slug')
  @ApiOperation({
    description: 'Borra a una alerta de admisión posgrado de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la alerta de admisión posgrado correctamente',
  })
  async deleteAlertaAdmisionPosgrado(
    @Param('slug') slug: string
  ) {
    let data;
    data = await this.alertaAdmisionPosgradoService.deleteAlertaAdmisionPosgrado(slug);
    return { message: 'Alerta de admisión posgrado eliminada', data };
  }

}