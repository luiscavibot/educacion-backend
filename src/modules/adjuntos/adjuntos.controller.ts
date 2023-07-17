import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdjuntosService } from './adjuntos.service';
import { CreateAdjuntoDto, EditAdjuntoDto } from './dtos';

@Controller('adjuntos')
export class AdjuntosController {

    constructor(private readonly adjuntoService: AdjuntosService){}

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number){
        const data = await this.adjuntoService.getById(id);
        return { data };
    }

    @Get(':tipo/:coleccionId')
    getAdjuntosPorColeccion(
        @Param('tipo') tipo: string,
        @Param('coleccionId') coleccionId: number,
    ) {
        return this.adjuntoService.adjuntosPorColeccion(tipo, coleccionId);
    }

    @Post()
    async createAdjunto(@Body() dto:CreateAdjuntoDto){
        const data = await this.adjuntoService.createAdjunto({...dto});
        return { message: 'Adjunto creado', data};
    }

    @Put(':id')
    async editAdjunto(@Param('id') id:number, @Body() dto: EditAdjuntoDto){
        let data;
        data = await this.adjuntoService.editAdjunto(id, dto);
        return { message: 'Adjunto editado', data };
    }

    @Delete(':id')
    async deleteAdjunto(@Param('id') id: number){
        let data;
        data = await this.adjuntoService.deleteAdjunto(id);
        return { message: 'Adjunto eliminado', data };
    }
}
