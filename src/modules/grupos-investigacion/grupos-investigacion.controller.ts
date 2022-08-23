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
import { GruposInvestigacionService } from './grupos-investigacion.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { GrupoInvestigacion } from './entity/grupo-investigacion.entity';
import { CreateGrupoInvestigacionDto } from './dtos/create-grupo-investigacion.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditGrupoInvestigacionDto } from './dtos/edit-grupo-investigacion.dto';

@Controller('grupos-investigacion')
export class GruposInvestigacionController {
  constructor(
    private readonly grupoInvestigacionService: GruposInvestigacionService,
  ) {}

  @Get(':slug')
  getAllNoticiasFacultad(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
    @Param('slug', new DefaultValuePipe('')) slug: string,
    @Query('query') query: string,
  ): Observable<Pagination<GrupoInvestigacion>> {
    limit = limit > 100 ? 100 : limit;
    return this.grupoInvestigacionService.paginacionGruposInvestigacion(
      {
        limit,
        page,
      },
      slug,
      query,
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async CreateGrupoInvestigacion(
    @Body() dto: CreateGrupoInvestigacionDto,
    @UploadedFile() file,
    @Res() response,
  ) {
    try {
      const data =
        await this.grupoInvestigacionService.createGrupoInvestigacion(
          { ...dto },
          file,
        );
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
  async editNoticia(
    @Param('id') id: number,
    @Body() dto: EditGrupoInvestigacionDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.resolucion = file.originalname;
    }
    let data;
    data = await this.grupoInvestigacionService.editGrupoInvestigacion(
      id,
      dto,
      file,
    );
    return { message: 'Grupo investigacion editado', data };
  }

  @Delete(':id')
  async deleteGrupoInvestigacion(@Param('id') id: number) {
    let data;
    data = await this.grupoInvestigacionService.deleteGrupoInvestigacion(id);
    return { message: 'Grupo investigacion eliminado', data };
  }
}
