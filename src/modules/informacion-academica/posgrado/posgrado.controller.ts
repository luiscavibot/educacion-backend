import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, HttpStatus, Query, DefaultValuePipe, Put, Delete } from '@nestjs/common';
import { CreatePosgradoDto } from './dto';
import { Posgrado } from './entity';
import { PosgradoService } from './posgrado.service';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { EditPosgradoDto } from './dto/edit-posgrado.dto';

@Controller('posgrado')
export class PosgradoController {

    constructor(
        private readonly posgradoService: PosgradoService
    ){}

    @Get('id/:id')
    async getById(@Param('id', ParseIntPipe) id:number){
        const data  = await this.posgradoService.getById(id);
        return { data };
    }

    @Post()
    async createPregrado(
        @Body() dto: CreatePosgradoDto,
        @Res() response,
    ){
        try {
            const data = await this.posgradoService.createPosgrado({...dto});
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
    async EditPregradoDto(
        @Param('id') id: number,
        @Body() dto: EditPosgradoDto,
    ){
        let data;
        data = await this.posgradoService.editPosgrado(id, dto);
        return { message: 'Informacion posgrado editada', data };
    }

    @Get(':slug')
    getAllPregradoXFacultad(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
        @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
        @Param('slug', new DefaultValuePipe('')) slug: string,
        // @Query('sort') sort: string,
        @Query('estado') estado: string,
        // @Query('escuelas') escuelas: string[],
        // @Query('recursos') recursos: string[],
        // @Query('query') query: string,
    ): Observable<Pagination<Posgrado>>{
        limit = limit > 100 ? 100 : limit;
        return this.posgradoService.paginacionPosgrado(
            {
                limit,
                page
            },
            slug,
            // sort,
            estado,
            // escuelas,
            // recursos,
            // query
        )
    }

    @Get('years/years-informacion-posgrado')
    getYears() {
        const years = this.posgradoService.yearsInfPosgrado();
        return { years };
    }

    @Get('tipo/informacion-posgrado')
    getTiposInfPregrado() {
        const tipos = this.posgradoService.tipoInfPosgrado();
        return { tipos };
    }

    @Get('tipo-de-programas/informacion-posgrado')
    getTiposProgramaPregrado() {
        const tiposDeProgramas = this.posgradoService.tipoProgramaPosgrado();
        return { tiposDeProgramas };
    }

    @Delete(':id')
    async deleteComunicado(@Param('id') id: number){
        let data;
        data = await this.posgradoService.deletePosgrado(id);
        return { message: 'Informacion academica de posgrado eliminada', data};
    }

}