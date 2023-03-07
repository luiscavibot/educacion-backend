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
import { MemoriasService } from './memorias.service';
import { Memoria } from './entity';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMemoriaDto } from './dtos/create-memoria.dto';
import { EditMemoriaDto } from './dtos/edit-memoria.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiTags } from '@nestjs/swagger';

@Controller('memorias')
@ApiTags('Memorias')
export class MemoriasController {
  constructor(private readonly memoriaService: MemoriasService) {}

  @Get(':slug')
  memoriasPorFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug') slug: string,
    @Query('estado') estado: string,
    @Query('sort') sort: string,
    @Query('fecha_inicio') fecha_inicio: string,
    @Query('fecha_fin') fecha_fin: string,
    @Query('query') query: string = '',
  ): Observable<Pagination<Memoria>> {
    return this.memoriaService.paginacionMemoria(
      {
        limit,
        page,
      },
      slug,
      estado,
      sort,
      fecha_inicio,
      fecha_fin,
      query,
    );
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
