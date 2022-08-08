import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DirectoriosService } from './directorios.service';
import { CreateDirectorioDto, EditDirectorioDto } from './dtos';
import { Observable } from 'rxjs';
import { Directorio } from './entity';

@Controller('directorios')
export class DirectoriosController {
  constructor(private readonly directorioService: DirectoriosService) {}

  @Get(':slug')
  destacadasNoticias(@Param('slug') slug: string): Observable<Directorio[]> {
    return this.directorioService.directoriosPorFacultad(slug);
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
