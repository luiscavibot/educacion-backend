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

import { AreasService } from './areas.service';
import { CreateAreaDto, EditAreaDto } from './dtos';

@Controller('areas')
@ApiTags('areas')
export class AreasController {
  constructor(private readonly areaService: AreasService) {}

  @Get()
  @ApiOperation({
    description: 'Devuelve todas las areas',
  })
  async getMany() {
    const data = await this.areaService.getMany();
    return { data };
  }

  @Get(':id')
  @ApiOperation({
    description: 'Devuelve una area dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del area',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.areaService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea una nueva area',
  })
  @ApiResponse({
    status: 201,
    description: 'Area creada correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El area existe`,
  })
  @ApiBody({
    description: 'Crea una nueva area usando una AreaDto',
    type: CreateAreaDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Ciencias Básicas',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'area',
        },
      },
    },
  })
  async createArea(@Body() dto: CreateAreaDto) {
    const data = await this.areaService.createArea({ ...dto });
    return { message: 'Area creada', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza una area',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del area',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza una area usando una AreaDto',
    type: EditAreaDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Ingenierías',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'Ciencias de la Salud',
        },
      },
    },
  })
  async editArea(@Param('id') id: number, @Body() dto: EditAreaDto) {
    let data;
    data = await this.areaService.editArea(id, dto);
    return { message: 'Area editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a una area dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del area',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el area correctamente',
  })
  async deleteArea(@Param('id') id: number) {
    let data;
    data = await this.areaService.deleteArea(id);
    return { message: 'Area eliminada', data };
  }
}
