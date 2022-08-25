import {
  Body,
  Controller,
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
import { MemoriasService } from './memorias.service';
import { Memoria } from './entity';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMemoriaDto } from './dtos/create-memoria.dto';
import { EditMemoriaDto } from './dtos/edit-memoria.dto';

@Controller('memorias')
export class MemoriasController {
  constructor(private readonly memoriaService: MemoriasService) {}

  @Get(':slug')
  memoriasPorFacultad(
    @Param('slug') slug: string,
    @Query('year', ParseIntPipe) year?: number,
  ): Observable<Memoria[]> {
    return this.memoriaService.memoriaPorFacultad(slug, year);
  }

  @Get('id/:id')
  async getByid(@Param('id') id: number) {
    const data = await this.memoriaService.getById(id);
    return { data };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createMemoria(
    @Body() dto: CreateMemoriaDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.memoriaService.createMemoria({ ...dto }, file);
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
  async editMemoria(
    @Param('id') id: number,
    @Body() dto: EditMemoriaDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.documento = file.originalname;
    }
    let data;
    data = await this.memoriaService.editMemoria(id, dto, file);
    return { message: 'Memoria editada', data };
  }

  @Delete(':id')
  async deleteMemoria(@Param('id') id: number) {
    let data;
    data = await this.memoriaService.deleteMemoria(id);
    return { message: 'Memoria eliminada', data };
  }
}
