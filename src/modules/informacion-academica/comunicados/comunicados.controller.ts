import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultValuePipe, Query } from '@nestjs/common'; 
import { ComunicadosService } from './comunicados.service';
import { CreateComunicadosDto } from './dto/create-comunicados.dto';
import { EditComunicadosDto } from './dto/edit-comunicados.dto';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Comunicado } from './entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('comunicados')
@ApiTags('Comunicados')
export class ComunicadosController {
    constructor(private readonly comunicadoService: ComunicadosService){}

    @Get('id/:id')
    @ApiOperation({
        description: 'Devuelve un comunicado dado un id',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha devuelto la información correctamente',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id de un comunicado',
    })
    async getById(@Param('id', ParseIntPipe) id: number){
        const data = await this.comunicadoService.getById(id);
        return { data };
    }

    @Get(':slug')
    @ApiOperation({
        description: 'Devuelve todos los comuicados por paginacion de una facultad ',
      })
      @ApiParam({
        name: 'slug',
        type: String,
        required: true,
        description: 'SLUG de la facultad a la que pertenecen los comunicados',
    })
    getAllComunicadosFacultad(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
        @Param('slug', new DefaultValuePipe('')) slug: string,
        @Query('sort') sort: string,
        @Query('tipos') tipos: string[],
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
          tipos,
          estado,
          busqueda,
          fechaInicio,
          fechaFin
        );
      }


    @Post()
    @ApiOperation({
        description: 'Crea un comunicado',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha creado correctamente',
    })
    @UseInterceptors(FileInterceptor('file'))
    async createComunicado(
        @Body() dto: CreateComunicadosDto,
        @Res() response,
        @UploadedFile() file,
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
    @ApiOperation({
        description: 'Actualiza y publica un comunicado',
    })
    @ApiParam({
          name: 'id',
          type: Number,
          required: true,
          description: 'Id del comunicado',
    })
    @ApiResponse({
          status: 200,
          description: 'Se ha actualizado correctamente',
    })
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
    @ApiOperation({
        description: 'Borra un comunicado dado un id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id del comunicado',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha borrado un trámite correctamente',
    })
    async deleteComunicado(@Param('id') id: number){
        let data;
        data = await this.comunicadoService.deleteComunicado(id);
        return { message: 'Comunicado eliminado', data};
    }

}
