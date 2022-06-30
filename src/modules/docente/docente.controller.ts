import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';

import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dtos';
import { Docente as DocenteEntity } from './entity';

@Controller('docentes')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Get()
  async getMany() {
    const data = await this.docenteService.getMany();
    return { data };
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.docenteService.getById(id);
    return { data };
  }

  @Post()
  async createPost(@Body() dto: CreateDocenteDto) {
    const data = await this.docenteService.createOne({ ...dto });
    return { message: 'Docente creado', data };
  }
}
