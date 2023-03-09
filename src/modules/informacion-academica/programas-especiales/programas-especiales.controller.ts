import { Controller, Param, Get, ParseIntPipe, Put, Body, Delete, Query, DefaultValuePipe } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProgramasEspecialesService } from './programas-especiales.service';
import { EditProgramaEspecialDto } from './dtos/edit-programa-especial.dto';
import { ProgramaEspecial } from './entity/programa-especial.entity';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('programas-especiales')
export class ProgramasEspecialesController {

  constructor(private readonly programaEspecialService: ProgramasEspecialesService) { }
  
  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un programa especial dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del programa especial',
  })
  async getProgramaEspecialById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.programaEspecialService.getProgramaEspecialById(id);
    return { data };
  }

  @Get('paginacion/:slug')
  @ApiOperation({
    description: 'Devuelve todas los programas especiales de una facultad',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description: 'url de la facultad',
  })
  getProgramasEspeciales(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort', new DefaultValuePipe('')) sort: string
  ): Observable<Pagination<ProgramaEspecial>> {
    limit = limit > 100 ? 100 : limit;
    const options = {
      limit,
      page,
      sort
    };
    return this.programaEspecialService.getPaginacionProgramasEspeciales(options, slug);
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza y publica un programa especial',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del programa especial',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  @ApiBody({
    description: 'Actualiza un programa especial usando una ProgramaEspecialDto',
    type: EditProgramaEspecialDto,
    examples: {
      ejemplo1: {
        value: {
          nombre: 'Ejemplo 1',
        },
      },
      ejemplo2: {
        value: {
          nombre: 'Ejemplo 2',
        },
      },
    },
  })
  async editProgramaEspecial(
    @Param('id') id: number,
    @Body() dto: EditProgramaEspecialDto,
  ) {

    let data;
    data = await this.programaEspecialService.EditProgramaEspecialDto(id, dto);
    return { message: 'programa especial actualizado y publicado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra a un programa especial dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del programa especial',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el programa especial correctamente',
  })
  async deleteProgramaEspecial(@Param('id') id: number) {
    let data:any;
    data = await this.programaEspecialService.deleteProgramaEspecial(id);
    return { message: 'programa especial eliminado', data };
  }

  @Get('recursos')
  getRecursos() {
      const recursos = this.programaEspecialService.recursos();
      return { recursos };
  }

  @Get('tipos-de-programas-especiales')
  getTiposDeProgramasEspeciales() {
    const tiposProgramasEspeciales = this.programaEspecialService.tipoProgramasEspeciales();
    return { tiposProgramasEspeciales };
  }
}
