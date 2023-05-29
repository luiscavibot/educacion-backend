import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FacultadesService } from './facultades.service';
import { CreateFacultadDto, EditFacultadDto } from './dtos';

@Controller('facultades')
@ApiTags('Facultades')
export class FacultadesController {
  constructor(private readonly facultadService: FacultadesService) {}

  @Get()
  @ApiOperation({
    description: 'Devuelve todas las facultades',
  })
  async getMany() {
    const data = await this.facultadService.getMany();
    return { data };
  }

  @Get(':id')
  @ApiOperation({
    description: 'Devuelve una facultad dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la facultad',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.facultadService.getById(id);
    return { data };
  }

  @Get('dirigidos-facultad/:id')
  async getDirigidosPorFacultad(@Param('id', ParseIntPipe) id: number) {
    const data = await this.facultadService.getDirigidosPorFacultad(id);
    return data ;
  }

  @Get('lista/facultades')
  async getListaFacultad() {
    const data = await this.facultadService.listFacultades();
    return data ;
  }
  
  @Post()
  @ApiOperation({
    description: 'Crea una nueva facultad',
  })
  @ApiResponse({
    status: 201,
    description: 'Facultad creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La facultad existe`,
  })
  @ApiBody({
    description: 'Crea una nueva facultad usando una FacultadDto',
    type: CreateFacultadDto,
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
  async createFacultad(@Body() dto: CreateFacultadDto) {
    const data = await this.facultadService.createFacultad({ ...dto });
    return { message: 'Facultad creada', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza una facultad',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la facultad',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una facultad usando una FacultadDto',
    type: EditFacultadDto,
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
  async editFacultad(@Param('id') id: number, @Body() dto: EditFacultadDto) {
    let data;
    data = await this.facultadService.editFacultad(id, dto);
    return { message: 'Facultad editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una facultad dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la facultad',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la facultad correctamente',
  })
  async deleteFacultad(@Param('id') id: number) {
    let data;
    data = await this.facultadService.deleteFacultad(id);
    return { message: 'Facultad eliminada', data };
  }
}
