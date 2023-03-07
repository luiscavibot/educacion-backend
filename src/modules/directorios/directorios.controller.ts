import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DirectoriosService } from './directorios.service';
import { CreateDirectorioDto, EditDirectorioDto } from './dtos';
import { Observable } from 'rxjs';
import { Directorio } from './entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('directorios')
@ApiTags('Directorios')
export class DirectoriosController {
  constructor(private readonly directorioService: DirectoriosService) {}

  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.directorioService.getById(id);
    return { data };
  }
  @Get(':slug')
  directoriosPorFacultad(@Param('slug') slug: string, @Query('search') search: string): Observable<Directorio[]> {
    return this.directorioService.directoriosPorFacultad(slug, search);
  }

  @Get('paginacion/:slug')
  directoriosPorPaginacion(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Query('sort') sort: string,
    @Param('slug', new DefaultValuePipe('')) slug: string,
  ): Observable<Pagination<Directorio>> {
    limit = limit > 100 ? 100 : limit;
    return this.directorioService.paginacionDirectorio(
      {
              limit,
              page,
      },
      slug,
      sort
    );
  }

  @Post()
  async createDirectorio(@Body() dto: CreateDirectorioDto) {
    const data = await this.directorioService.CreateDirectorio({ ...dto });
    return { message: 'Directorio creado', data };
  }

  @Put(':id')
  async editDocente(@Param('id') id: number, @Body() dto: EditDirectorioDto) {
    let data;
    data = await this.directorioService.editDirectorio(id, dto);
    return { message: 'Directorio editado', data };
  }

  @Delete(':id')
  async deleteDocente(@Param('id') id: number) {
    let data;
    data = await this.directorioService.deleteDirectorio(id);
    return { message: 'Directorio eliminado', data };
  }
}
