import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEgresadoDto, EditEgresadoDto } from './dtos';
import { EgresadosService } from './egresados.service';
import { Egresado } from './entity';

@Controller('egresados')
export class EgresadosController {
  constructor(private readonly egresadoService: EgresadosService) {}

  @UseInterceptors(FileInterceptor('file'))
  async createNoticia(@Body() dto: CreateEgresadoDto, @UploadedFile() file) {
    if (file) {
      dto.foto = file.originalname;
    }
    const data = await this.egresadoService.createEgresado({ ...dto }, file);
    return { message: 'egresado creado', data };
  }
  @UseInterceptors(FileInterceptor('file'))
  async editNoticia(
    @Param('id') id: number,
    @Body() dto: EditEgresadoDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.foto = file.originalname;
    }
    let data;
    data = await this.egresadoService.editEgresado(id, dto, file);
    return { message: 'Egresado editado', data };
  }
}
