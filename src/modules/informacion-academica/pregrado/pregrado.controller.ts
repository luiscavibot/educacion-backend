import { Controller, Get, Param, ParseIntPipe, Query, DefaultValuePipe, Body, Post, Res, HttpStatus, Delete, Put } from '@nestjs/common';
import { PregradoService } from './pregrado.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Pregrado } from './entity';
import { CreatePregradoDto } from './dto';
import { response } from 'express';
import { EditPregradoDto } from './dto/edit-pregrado.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('pregrado')
@ApiTags('Pregrado')
export class PregradoController {

    constructor(
        private readonly pregradoService: PregradoService
    ){}

    @Get('id/:id')
    @ApiOperation({
        description: 'Devuelve una infomacion académica de pregrado dado un id',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha devuelto la información correctamente',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id de una infomacion académica de pregrado',
    })
    async getById(@Param('id', ParseIntPipe) id:number){
        const data  = await this.pregradoService.getById(id);
        return { data };
    }

    @Get(':slug')
    @ApiOperation({
        description: 'Devuelve todos las informaciones academica de pregrado por paginacion de una facultad ',
      })
    @ApiParam({
        name: 'slug',
        type: String,
        required: true,
        description: 'SLUG de la facultad a la que pertenecen las informaciones academicas de pregrado',
    })
    getAllPregradoXFacultad(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
        @Param('slug', new DefaultValuePipe('')) slug: string,
        @Query('sort') sort: string,
        @Query('estado') estado: string,
        @Query('escuelas') escuelas: string[],
        @Query('recursos') recursos: string[],
        @Query('query') query: string,
        @Query('fijado') fijado: boolean,
        @Query('anio') anio: string,
    ): Observable<Pagination<Pregrado>>{
        limit = limit > 100 ? 100 : limit;
        return this.pregradoService.paginacionPregrado(
            {
                limit,
                page
            },
            slug,
            sort,
            estado,
            escuelas,
            recursos,
            query,
            fijado,
            anio
        )
    }

    @Get('years/years-informacion-pregrado')
    @ApiOperation({
        description: 'Devuelve los años de las informaciones de pregrado',
    })
    getYears() {
        const years = this.pregradoService.yearsInfPregrado();
        return { years };
    }

    @Get('tipo/informacion-pregrado')
    @ApiOperation({
        description: 'Devuelve los tipos de información de pregrado',
    })
    getTiposInfPregrado() {
        const tipos = this.pregradoService.tipoInfPregrado();
        return { tipos };
    }

    @Post()
    @ApiOperation({
        description: 'Crea una información académica de pregrado',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha creado correctamente',
    })
    async createPregrado(
        @Body() dto: CreatePregradoDto,
        @Res() response,
    ){
        try {
            const data = await this.pregradoService.createPregrado({...dto});
            console.log(data);
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
        description: 'Actualiza y publica una información de pregrado',
    })
    @ApiParam({
          name: 'id',
          type: Number,
          required: true,
          description: 'Id de la información de pregrado',
    })
    @ApiResponse({
          status: 200,
          description: 'Se ha actualizado correctamente',
    })
    async EditPregradoDto(
        @Param('id') id: number,
        @Body() dto: EditPregradoDto,
    ){
        let data;
        data = await this.pregradoService.editPregrado(id, dto);
        return { message: 'Informacion pregrado editada', data };
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Borra la información de pregrado dado un id',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id de la información de pregrado',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha borrado un trámite correctamente',
    })
    async deletePregrado(@Param('id') id: number){
        let data;
        data = await this.pregradoService.deletePregrado(id);
        return { message: 'Informacion academica de pregrado eliminado', data};
    }

}
