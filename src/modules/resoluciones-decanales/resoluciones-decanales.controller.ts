import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
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

@Controller('resoluciones-decanales')
export class ResolucionesDecanalesController {
  constructor(
    private readonly resolucionDecanalService: ResolucionesDecanalesService,
  ) {}

  @Get(':slug')
  resolucionesDecanalesPorFacultad(
    @Param('slug') slug: string,
    @Query('year', ParseIntPipe) year?: number,
  ): Observable<ResolucionDecanal[]> {
    return this.resolucionDecanalService.resolucionDecanalPorFacultad(
      slug,
      year,
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
}
