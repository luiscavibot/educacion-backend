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
import { ResolucionesDecanalesService } from './resoluciones-decanales.service';
import { Observable } from 'rxjs';
import { ResolucionDecanal } from './entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateResolucionDecanalDto } from './dtos';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EditResolucionDecanalDto } from './dtos/edit-resolucion-decanal.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('resoluciones-decanales')
@ApiTags('Resoluciones Decanales')
export class ResolucionesDecanalesController {
  constructor(
    private readonly resolucionDecanalService: ResolucionesDecanalesService,
  ) {}

  @Get(':slug')
  @ApiOperation({
    description: 'Devuelve todas las resoluciones decanales por paginacion de una facultad ',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'SLUG de la facultad a la que pertenecen las resoluciones decanales',
  })
  paginacionResolucionesDecanales(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug') slug: string,
    @Query('estado') estado: string,
    @Query('sort') sort: string,
    @Query('fecha_inicio') fecha_incio: string,
    @Query('fecha_fin') fecha_fin: string,
    @Query('query') query: string = '',
  ): Observable<Pagination<ResolucionDecanal>> {
    return this.resolucionDecanalService.paginacionResolucionesDecanales(
      {
        limit,
        page,
      },
      slug,
      estado,
      sort,
      fecha_incio,
      fecha_fin,
      query,
    );
  }

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve una resolucion decanal dado un Id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la resolucion decanal',
  })
  async getByid(@Param('id') id: number) {
    const data = await this.resolucionDecanalService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea una resolucion decanal',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha creado correctamente',
  })
  @UseInterceptors(FileInterceptor('file'))
  async createResolucionDecanal(
    @Body() dto: CreateResolucionDecanalDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.resolucionDecanalService.createResolucionDecanal(
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
    description: 'Actualiza una resolucion decanal',
  })
  @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id de la resolucion decanal',
  })
  @ApiResponse({
      status: 200,
      description: 'Se ha actualizado correctamente',
  })
  @UseInterceptors(FileInterceptor('file'))
  async editResolucionDecanal(
    @Param('id') id: number,
    @Body() dto: EditResolucionDecanalDto,
    @UploadedFile() file,
  ) {
    let data;
    data = await this.resolucionDecanalService.editResolucionDecanal(
      id,
      dto,
      file,
    );
    return { message: 'Resolucion decanal editada', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra una resolucion decanal dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la resolucion decanal',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado una resolucion decanal correctamente',
  })
  async deleteResolucionDecanal(@Param('id') id: number) {
    let data;
    data = await this.resolucionDecanalService.deleteResolucionDecanal(id);
    return { message: 'Resolucion decanal eliminada', data };
  }
}