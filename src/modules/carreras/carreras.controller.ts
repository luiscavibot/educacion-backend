import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { EditCarreraDto } from './dtos/edit-carrera.dto';
import { CreateCarreraDto } from './dtos/create-carrera.dto';
import { CarrerasService } from './carreras.service';

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carreraService: CarrerasService) {}

  @Get()
  @ApiOperation({
    description: 'Devuelve todas las carreras',
  })
  async getMany() {
    const data = await this.carreraService.getMany();
    return { data };
  }

  @Get(':id')
  @ApiOperation({
    description: 'Devuelve una carrera dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.carreraService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva carrera',
  })
  @ApiResponse({
    status: 201,
    description: 'Carrera creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La carrera existe`,
  })
  @ApiBody({
    description: 'Crea una nueva carrera usando una CarreraDto',
    type: CreateCarreraDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Facultad demo 1',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'Facultad demo 2',
        },
      },
    },
  })
  async createCarrera(@Body() dto: CreateCarreraDto) {
    const data = await this.carreraService.createCarrera({ ...dto });
    return { message: 'Carrera creada', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza una carreras',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha la carrera correctamente',
  })
  @ApiBody({
    description: 'Actualiza una carrera usando una CarreraDto',
    type: EditCarreraDto,
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
  async editCarrera(@Param('id') id: number, @Body() dto: EditCarreraDto) {
    let data;
    data = await this.carreraService.editCarrera(id, dto);
    return { message: 'Carrera editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una carrera dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la carrera',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la carrera correctamente',
  })
  async deleteCarrera(@Param('id') id: number) {
    let data;
    data = await this.carreraService.deleteCarrera(id);
    return { message: 'Carrera eliminada', data };
  }
}