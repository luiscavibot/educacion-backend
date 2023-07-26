import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';
import { EditAsignaturaDto } from './dtos/edit-asignatura.dto';
import { CreateAsignaturaDto } from './dtos/create-asignatura.dto';
import { Observable } from 'rxjs';
import { Asignatura } from './entity/asignatura.entity';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('asignaturas')
@ApiTags('Asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturaService: AsignaturasService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todas las asignaturas por carrera'
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'Url de la carrera'
  })
  asignaturasXcarrera(@Param('slug') slug: string): Observable<Asignatura[]> {
    return this.asignaturaService.asignaturaPorCarrera(slug);
  }

  @ApiOperation({
    description: 'Crea una nueva asignatura'
  })
  @ApiResponse({
    status: 201,
    description: 'Alerta informativa creada correctamente',
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  @Post()
  async createAsignatura(@Body() dto: CreateAsignaturaDto) {
    try {
      const data = await this.asignaturaService.createAsignatura({ ...dto });
      return { message: 'Asignatura creada', data };
    } catch (error) {
      throw error;
    }
  }


  @ApiOperation({
    description: 'Actualiza y publica una asignatura',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado la asignatura correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la Asignatura',
  })
  @Put(':id')
  async editAsignatura(@Param('id') id: number, @Body() dto: EditAsignaturaDto) {
    let data;
    data = await this.asignaturaService.editAsignatura(id, dto);
    return { message: 'Asignatura editada', data };
  }


  @ApiOperation({
    description: 'Borra a una asignatura dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la asignatura',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la asignatura correctamente',
  })
  @Delete(':id')
  async deleteAsignatura(@Param('id') id: number) {
    let data;
    data = await this.asignaturaService.deleteAsignatura(id);
    return { message: 'Asignatura eliminada', data };
  }
}
