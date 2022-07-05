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

import { DocenteService } from './docentes.service';
import { CreateDocenteDto, EditDocenteDto } from './dtos';

@Controller('docentes')
@ApiTags('docentes')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Get()
  @ApiOperation({
    description: 'Devuelve todos los docentes',
  })
  async getMany() {
    const data = await this.docenteService.getMany();
    return { data };
  }

  @Get(':id')
  @ApiOperation({
    description: 'Devuelve un docente dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del docente',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.docenteService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea un nuevo docente',
  })
  @ApiResponse({
    status: 201,
    description: 'Docente creado correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El docente existe`,
  })
  @ApiBody({
    description: 'Crea un nuevo docente usando un DocenteDto',
    type: CreateDocenteDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'docente',
          correo: 'docente1@gmail.com',
          grado: 'Magister',
          descripcion: 'Esta es una descripcion',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'docente 2',
          correo: 'docente2@gmail.com',
          grado: 'Doctor',
          descripcion: 'Esta es una descripcion de un docente de prueba',
        },
      },
    },
  })
  async createDocente(@Body() dto: CreateDocenteDto) {
    const data = await this.docenteService.createDocente({ ...dto });
    return { message: 'Docente creado', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza un docente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del docente',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza un docente usando un DocenteDto',
    type: EditDocenteDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'docente actualizado',
          correo: 'docente1@gmail.com',
          grado: 'Magister',
          descripcion: 'Esta es una descripcion',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'docente actualizado 2',
          correo: 'docente2@gmail.com',
          grado: 'Doctor',
          descripcion: 'Esta es una descripcion de un docente de prueba',
        },
      },
    },
  })
  async editDocente(@Param('id') id: number, @Body() dto: EditDocenteDto) {
    let data;
    data = await this.docenteService.editDocente(id, dto);
    return { message: 'Docente editado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a un docente dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del docente',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el docente correctamente',
  })
  async deleteDocente(@Param('id') id: number) {
    let data;
    data = await this.docenteService.deleteDocente(id);
    return { message: 'Docente eliminado', data };
  }
}
