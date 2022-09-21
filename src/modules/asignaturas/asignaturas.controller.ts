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
import { AsignaturasService } from './asignaturas.service';
import { EditAsignaturaDto } from './dtos/edit-asignatura.dto';
import { CreateAsignaturaDto } from './dtos/create-asignatura.dto';
import { Observable } from 'rxjs';
import { Asignatura } from './entity/asignatura.entity';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturaService: AsignaturasService) {}

  // @Get(':slug')
  // carreras(@Param('slug') slug: string): Observable<Asignatura[]> {
  //   return this.asignaturaService.asignaturaPorCarrera(slug);
  // }

  @Post()
  async createCarrera(@Body() dto: CreateAsignaturaDto) {
    const data = await this.asignaturaService.createAsignatura({ ...dto });
    return { message: 'Asignatura creada', data };
  }
  @Put(':id')
  async editCarrera(@Param('id') id: number, @Body() dto: EditAsignaturaDto) {
    let data;
    data = await this.asignaturaService.editAsignatura(id, dto);
    return { message: 'Asignatura editada', data };
  }
  @Delete(':id')
  async deleteAsignatura(@Param('id') id: number) {
    let data;
    data = await this.asignaturaService.deleteAsignatura(id);
    return { message: 'Asignatura eliminada', data };
  }
}
