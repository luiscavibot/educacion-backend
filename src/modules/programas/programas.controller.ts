import { Controller, UseInterceptors, Body, UploadedFile, Res, HttpStatus, Post, Delete, Param, Put, Query, DefaultValuePipe, ParseIntPipe, Get } from '@nestjs/common';
import { ProgramasService } from './programas.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProgramaDto, EditProgramaDto } from './dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Programa } from './entity/programa.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('programas')
@ApiTags('Programas')
export class ProgramasController {
    constructor(private readonly programaService: ProgramasService) {}
    
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPrograma(
    @Body() dto: CreateProgramaDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data = await this.programaService.createPrograma({ ...dto }, file);
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

  @Get(':slug')
  getAllNoticiasFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort') sort: string,
    @Query('estado') estado: string,
    // @Query('ref') ref: string,
  ): Observable<Pagination<Programa>> {
    limit = limit > 100 ? 100 : limit;
    return this.programaService.paginacionProgramas(
      {
        limit,
        page,
      },
      slug,
      sort,
      estado,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async editPrograma(
    @Param('id') id: number,
    @Body() dto: EditProgramaDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.foto = file.originalname;
    }
    let data;
    data = await this.programaService.editPrograma(id, dto, file);
    return { message: 'Programa editado', data };
  }

  @Get('lista-programas/:slug')
  escuelasxFacultad(
    @Param('slug') slug: string,
    @Query('tipo') tipo: string,
  ): Observable<Programa[]> {
    return this.programaService.listaDeProgramas(slug, tipo);
  }

  @Delete(':id')
  async deleteNoticia(@Param('id') id: number) {
    let data;
    data = await this.programaService.deletePrograma(id);
    return { message: 'Programa eliminado', data };
  }

}
