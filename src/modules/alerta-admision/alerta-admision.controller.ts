import { Body, Controller, Delete, Get, HttpStatus, Param, Query, Post, Put, Res } from '@nestjs/common';
import { DefaultValuePipe, ParseBoolPipe } from '@nestjs/common/pipes';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlertaAdmisionService } from './alerta-admision.service';
import { CreateAlertaAdmisionDto, EditAlertaAdmisionDto } from './dtos';
import { AlertaAdmision } from './entity';

@Controller('alertas-admision')
@ApiTags('Alertas Admisión')
export class AlertaAdmisionController {
  constructor(private readonly alertaAdmisionService: AlertaAdmisionService) { }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva alerta admisión',
  })
  @ApiResponse({
    status: 201,
    description: 'alerta admisión creada correctamente',
  })
  @ApiBody({
    description: 'Crea una nueva alerta admisión usando una AlertaInformativaDto',
    type: CreateAlertaAdmisionDto,
    examples: {
      ejemplo1: {
        value: {
          titulo: "Nueva alerta",
          nivelDeEstudio: "posgrado",
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
          fecha_inicio: '2023-01-01',
          fecha_fin: '2023-12-31'
        },
      },
    },
  })
  async createAlertaAdmision(
    @Body() dto: CreateAlertaAdmisionDto,
    @Res() response
  ) {
    try {
      const data = await this.alertaAdmisionService.createAlertaAdmision({ ...dto });
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

    @Get(':slug')
    @ApiOperation({
      description: 'Devuelve la alerta de admisión publicada de una facultad',
    })
    @ApiParam({
      name: 'slug',
      type: String,
      required: true,
      description: 'url de la facultad',
    })
    async getAlertaAdmision(
        @Param('slug') slug: string,
        @Query('isPublic', new DefaultValuePipe(false), ParseBoolPipe) isPublic : boolean = false
    ): Promise<AlertaAdmision> {
        const alertaAdmision = await this.alertaAdmisionService.getAlertaAdmision(slug, isPublic);
        return alertaAdmision;
    }


    @ApiOperation({
      description: 'Actualizar alerta de admisión de una facultad',
    })
    @Put(':id')
    async editAlertaAdmision(@Param('id') id: number, @Body() dto: EditAlertaAdmisionDto){
      let data;
      data = await this.alertaAdmisionService.editAlertaAdmision(id, dto);
      return { message: 'Alerta admision editada', data };
    }

  
    @Delete(':slug')
    @ApiOperation({
      description: 'Borra a una alerta de admisión de una facultad',
    })
    @ApiParam({
      name: 'slug',
      type: String,
      required: true,
      description: 'url de la facultad',
    })
    @ApiResponse({
      status: 200,
      description: 'Se ha borrado la alerta de admisión correctamente',
    })
    async deleteAlertaAdmisionPosgrado(
      @Param('slug') slug: string
    ) {
      let data;
      data = await this.alertaAdmisionService.deleteAlertaAdmision(slug);
      return { message: 'Alerta de admisión eliminada', data };
    }

}