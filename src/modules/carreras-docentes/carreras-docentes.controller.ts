import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { CarrerasDocentesService } from './carreras-docentes.service';
import { CreateCarreraDocenteDto, EditCarreraDocenteDto } from './dtos';
import { Observable } from 'rxjs';
import { CarreraDocente } from './entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('carreras-docentes')
@ApiTags('Carreras Docentes')
export class CarrerasDocentesController {
  constructor(private readonly carreraService: CarrerasDocentesService) {}

  async getById(@Param('id', ParseIntPipe) id: number, @Res() response) {
    try {
      const data = await this.carreraService.getById(id);
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.OK,
        message: 'Respuesta exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al obtener registros',
        error: error.message,
      });
    }
  }

  @ApiOperation({
    description: 'Crea una registro nuevo de carrera-docente'
  })
  @ApiResponse({
    status: 201,
    description: 'carrera-docente creado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  async createCarreraDocente(
    @Body() dto: CreateCarreraDocenteDto,
    @Res() response,
  ) {
    try {
      const data = await this.carreraService.createCarreraDocente({ ...dto });

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

  @ApiOperation({
    description: 'Actualiza un registro de carrera-deconte',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del registro de carrera-docente',
  })
  async editCarreraDocente(
    @Param('id') id: number,
    @Body() dto: EditCarreraDocenteDto,
    @Res() response,
  ) {
    try {
      let data;
      data = await this.carreraService.editCarreraDocente(id, dto);
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Actualización exitosa',
        data,
      });
      return { message: 'Carrera editada', data };
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al actualizar registro',
        error: error.message,
      });
    }
  }

  @ApiOperation({
    description: 'Elimina un registro de carrera-docente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del carrera-docente',
  })
  async deleteCarreraDocente(@Param('id') id: number, @Res() response) {
    try {
      let data;
      data = await this.carreraService.deleteCarreraDocente(id);
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Eliminacion exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al eliminar registro',
        error: error.message,
      });
    }
  }

  @ApiOperation({
    description: 'Devuelve todos los docentes que son directores por carrera',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @Get('directores/:id')
  directores(@Param('id') id: number): Observable<CarreraDocente[]> {
    return this.carreraService.directoresXCarrera(id);
  }

  @ApiOperation({
    description: 'Devuelve todos los docentes que son coordinadores por carrera',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @Get('coordinadores/:id')
  coordinadores(@Param('id') id: number): Observable<CarreraDocente[]> {
    return this.carreraService.coordinadoresXCarrera(id);
  }

  @ApiOperation({
    description: 'Devuelve todos los docentes que son directores por carrera',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @Get('docentes/:id')
  docentes(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('id') id: number,
  ): Observable<Pagination<CarreraDocente>> {
    return this.carreraService.docentesXCarrera(
      {
        limit,
        page,
      },
      id,
    );
  }
}
