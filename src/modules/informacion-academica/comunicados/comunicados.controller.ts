import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DefaultValuePipe, Query } from '@nestjs/common'; 
import { ComunicadosService } from './comunicados.service';
import { CreateComunicadosDto } from './dto/create-comunicados.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { EditComunicadosDto } from './dto/edit-comunicados.dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Comunicado } from './entity';

@Controller('comunicados')
@ApiTags('Comunicados')
export class ComunicadosController {
    constructor(private readonly comunicadoService: ComunicadosService){}

    @Get('id/:id')
    async getById(@Param('id', ParseIntPipe) id: number){
        const data = await this.comunicadoService.getById(id);
        return { data };
    }

    @Get(':slug')
    getAllComunicadosFacultad(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
        @Param('slug', new DefaultValuePipe('')) slug: string,
        @Query('sort') sort: string,
        @Query('estado') estado: string,
        @Query('busqueda') busqueda: string = '',
        @Query('fechaInicio') fechaInicio?: Date,
        @Query('fechaFin') fechaFin?: Date,
      ): Observable<Pagination<Comunicado>> {
        limit = limit > 100 ? 100 : limit;

        return this.comunicadoService.paginacionComunicados(
          {
            limit,
            page,
          },
          slug,
          sort,
          estado,
          busqueda,
          fechaInicio,
          fechaFin
        );
      }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createComunicado(
        @Body() dto: CreateComunicadosDto,
        @UploadedFile() file,
        @Res() response,
    ){
        try {
            const data = await this.comunicadoService.createComunicado({...dto}, file);
            response.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                message: 'Creacion exitosa',
                data,
            });
        } catch(error){
            response.status(HttpStatus.FORBIDDEN).json({
                status: HttpStatus.FORBIDDEN,
                message: 'Hubo un error al crear el registro',
                error: error.message,
            })
        }
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async editComunicado(
        @Param('id') id: number,
        @Body() dto: EditComunicadosDto,
        @UploadedFile() file,
    ){
        let data;
        data = await this.comunicadoService.editComunicado(id, dto, file);
        return { message: 'Comunicado editado', data};
    }

    @Delete(':id')
    async deleteComunicado(@Param('id') id: number){
        let data;
        data = await this.comunicadoService.deleteComunicado(id);
        return { message: 'Comunicado eliminado', data};
    }

}
