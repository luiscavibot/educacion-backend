import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  HttpStatus,
  Query,
  DefaultValuePipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CreatePosgradoDto } from './dto';
import { Posgrado } from './entity';
import { PosgradoService } from './posgrado.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EditPosgradoDto } from './dto/edit-posgrado.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('posgrado')
@ApiTags('Posgrado')
export class PosgradoController {
  constructor(private readonly posgradoService: PosgradoService) {}

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve una infomacion académica de posgrado dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de una infomacion académica de posgrado',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.posgradoService.getById(id);
    return { data };
  }

  @Post()
  @ApiOperation({
    description: 'Crea una información académica de posgrado',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha creado correctamente',
  })
  async createposgrado(@Body() dto: CreatePosgradoDto, @Res() response) {
    try {
      const data = await this.posgradoService.createPosgrado({ ...dto });
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Creacion exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al crear el registro',
        error: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza y publica una información de posgrado',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la información de posgrado',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha actualizado correctamente',
  })
  async EditposgradoDto(@Param('id') id: number, @Body() dto: EditPosgradoDto) {
    let data;
    data = await this.posgradoService.editPosgrado(id, dto);
    return { message: 'Informacion posgrado editada', data };
  }

  @Get(':slug')
  @ApiOperation({
    description:
      'Devuelve todos las informaciones academica de posgrado por paginacion de una facultad ',
  })
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
    description:
      'SLUG de la facultad a la que pertenecen las informaciones academicas de posgrado',
  })
  getAllposgradoXFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    // @Query('sort') sort: string,
    @Query('estado') estado: string,
    @Query('programas') programas: string[],
    @Query('tipoPrograma') tipoPrograma: string[],
    @Query('recursos') recursos: string[],
    @Query('query') query: string,
  ): Observable<Pagination<Posgrado>> {
    limit = limit > 100 ? 100 : limit;
    return this.posgradoService.paginacionPosgrado(
      {
        limit,
        page,
      },
      slug,
      // sort,
      estado,
      programas,
      recursos,
      query,
      tipoPrograma,
    );
  }

  @Get('years/years-informacion-posgrado')
  @ApiOperation({
    description:
      'Devuelve los años de las informaciones academémica de posgrado',
  })
  getYears() {
    const years = this.posgradoService.yearsInfPosgrado();
    return { years };
  }

  @Get('tipo/informacion-posgrado')
  getTiposInfposgrado() {
    const tipos = this.posgradoService.tipoInfPosgrado();
    return { tipos };
  }

  @Get('tipo-de-programas/informacion-posgrado')
  @ApiOperation({
    description: 'Devuelve los tipos de información académica de posgrado',
  })
  getTiposProgramaposgrado() {
    const tiposDeProgramas = this.posgradoService.tipoProgramaPosgrado();
    return { tiposDeProgramas };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra la información de posgrado dado un id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de la información de posgrado',
  })
  @ApiResponse({
    status: 200,
    description:
      'Se ha borrado una información académica de posgrado correctamente',
  })
  async deleteComunicado(@Param('id') id: number) {
    let data;
    data = await this.posgradoService.deletePosgrado(id);
    return { message: 'Informacion academica de posgrado eliminada', data };
  }
}
