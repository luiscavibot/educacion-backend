import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActasConsejoService } from './actas-consejo.service';
import { Observable } from 'rxjs';
import { ActaConsejo } from './entity/acta-consejo.entity';
import { CreateActaConsejoDto } from './dtos/create-acta-consejo.dto';
import { EditActaConsejoDto } from './dtos/edit-acta-consejo.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('actas-consejo')
@ApiTags('Actas Consejo')
export class ActasConsejoController {
  constructor(private readonly actaConsejoService: ActasConsejoService) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todos los adjuntos por paginacion de una facultad ',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'SLUG de la facultad a la que pertenecen las actas de consejo',
})
  paginacionActaConsejo(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug') slug: string,
    @Query('sort') sort: string,
    @Query('estado') estado: string,
    @Query('fecha_inicio') fecha_incio: string,
    @Query('fecha_fin') fecha_fin: string,
    @Query('query') query: string ='',
  ): Observable<Pagination<ActaConsejo>> {
    return this.actaConsejoService.paginacionActasConsejo(
      {
        limit,
        page,
      },
      slug,
      sort,
      estado,
      fecha_incio,
      fecha_fin,
      query,
    );
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un acta de consejo dado un Id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del acta de consejo',
  })
  async getByid(@Param('id') id: number) {
    const data = await this.actaConsejoService.getById(id);
    return { data };
  }

  @Get('tipos/tipos-sesion')
  @ApiOperation({
    description: 'Devuelve los tipos de actas de consejo',
  })
  getTipos() {
    const tipos = this.actaConsejoService.tipoSesion();
    return { tipos };
  }

  @Post()
  @ApiOperation({
    description: 'Crea un acta de consejo',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha creado correctamente',
  })
  @UseInterceptors(FileInterceptor('file'))
  async createActaConsejo(
    @Body() dto: CreateActaConsejoDto,
    @UploadedFile() file,
    @Res()
    response,
  ) {
    try {
      const data = await this.actaConsejoService.createActaConsejo(
        { ...dto },
        file,
      );
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
    description: 'Actualiza y publica un acta de consejo',
  })
  @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id del acta de consejo',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha actualizado correctamente',
  })
  @UseInterceptors(FileInterceptor('file'))
  async editActaConsejo(
    @Param('id') id: number,
    @Body() dto: EditActaConsejoDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.documento = file.originalname;
    }
    let data;
    data = await this.actaConsejoService.editActaConsejo(id, dto, file);
    return { message: 'Acta consejo editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra un acta de consejo dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del acta de consejo',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado un acta de consejo correctamente',
  })
  @Delete(':id')
  async deleteActaConsejo(@Param('id') id: number) {
    let data;
    data = await this.actaConsejoService.deleteActaConsejo(id);
    return { message: 'Acta consejo eliminada', data };
  }

  @Delete('eliminar')
  @ApiOperation({
    description: 'Borra una lista de documentos oficiales',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado la lista de documentos oficiales correctamente',
  })
  async deleteActasConsejos(@Body() arreglo: number[]) {
    let data;
    if ((arreglo.length = 0)) return { message: 'Arreglo vacio' };
    data = arreglo.map((acta) => {
      this.actaConsejoService.deleteActaConsejo(acta);
    });

    return { message: 'Actas de consejo eliminadas' };
  }
}
