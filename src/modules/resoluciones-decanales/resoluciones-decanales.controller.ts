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

@Controller('resoluciones-decanales')
export class ResolucionesDecanalesController {
  constructor(
    private readonly resolucionDecanalService: ResolucionesDecanalesService,
  ) {}

  @Get(':slug')
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
  async getByid(@Param('id') id: number) {
    const data = await this.resolucionDecanalService.getById(id);
    return { data };
  }

  @Post()
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
  async deleteResolucionDecanal(@Param('id') id: number) {
    let data;
    data = await this.resolucionDecanalService.deleteResolucionDecanal(id);
    return { message: 'Resolucion Decanal eliminada', data };
  }
}
