import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UploadedFile,
  Res,
  HttpStatus,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('')
  async getByNombre(@Query('nombre') nombre: string) {
    const data = await this.docenteService.getByNombre(nombre);
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
  @UseInterceptors(FileInterceptor('file'))
  async createDocente(
    @Body() dto: CreateDocenteDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.docenteService.createDocente({ ...dto }, file);
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
  async editDocente(
    @Param('id') id: number,
    @Body() dto: EditDocenteDto,
    @UploadedFile() file,
  ) {
    let data;
    data = await this.docenteService.editDocente(id, dto, file);
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
