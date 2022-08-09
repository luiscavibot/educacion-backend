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

@Controller('tramites')
export class TramitesController {
  constructor(private readonly tramiteService: TramitesService) {}

  @Get(':slug')
  getAllTramitesFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
  ): Observable<Pagination<Tramite>> {
    limit = limit > 100 ? 100 : limit;
    return this.tramiteService.paginacionTramites(
      {
        limit,
        page,
      },
      slug,
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

  @Put(':id')
  async editTramite(@Param('id') id: number, @Body() dto: EditTramiteDto) {
    let data;
    data = await this.tramiteService.editTramite(id, dto);
    return { message: 'Tramite editado', data };
  }

  @Delete(':id')
  async deleteNoticia(@Param('id') id: number) {
    let data;
    data = await this.tramiteService.deleteTramite(id);
    return { message: 'Tramite eliminado', data };
  }
}
