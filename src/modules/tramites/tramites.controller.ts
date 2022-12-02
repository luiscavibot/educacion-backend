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
} from '@nestjs/common';
import { CreateTramiteDto } from './dtos';
import { TramitesService } from './tramites.service';
import { EditTramiteDto } from './dtos/edit-tramite.dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Tramite } from './entity';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramiteService: TramitesService) {}

  @Get(':slug')
  getAllTramitesFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('sort') sort: string,
    @Query('estado') estado: string,
    @Query('tipos') tipos: string[],
    @Query('query') query: string ='',
    ): Observable<Pagination<Tramite>> {
    limit = limit > 100 ? 100 : limit;
    return this.tramiteService.paginacionTramites(
      {
        limit,
        page,
      },
      slug,
      sort,
      estado,
      tipos,
      query
    );
  }

  @Post()
  async createTramite(@Body() dto: CreateTramiteDto, @Res() response) {
    try {
      const data = await this.tramiteService.createTramite({ ...dto });
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

  @Get('id/:id')
  @ApiOperation({
    description: 'Devuelve un tramite dado un id',
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha devuelto la información correctamente',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id de un tramite',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.tramiteService.getById(id);
    return { data };
  }

  @Put(':id')
  async editTramite(@Param('id') id: number, @Body() dto: EditTramiteDto) {
    let data;
    data = await this.tramiteService.editTramite(id, dto);
    return { message: 'Tramite editado', data };
  }

  @Get('tipos/tipos-tramites')
  getTipos() {
    const tipos = this.tramiteService.tipoTramite();
    return { tipos };
  }

  @Delete(':id')
  async deleteNoticia(@Param('id') id: number) {
    let data;
    data = await this.tramiteService.deleteTramite(id);
    return { message: 'Tramite eliminado', data };
  }
}
