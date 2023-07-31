import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AdjuntosService } from './adjuntos.service';
import { CreateAdjuntoDto, EditAdjuntoDto } from './dtos';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('adjuntos')
@ApiTags('Adjuntos')
export class AdjuntosController {

    constructor(private readonly adjuntoService: AdjuntosService){}

    @Get(':id')
    @ApiOperation({
        description: 'Devuelve un adjunto dado un id',
      })
      @ApiResponse({
        status: 200,
        description: 'Se ha devuelto la información correctamente',
      })
      @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id del adjunto',
      })
    async getById(@Param('id', ParseIntPipe) id: number){
        const data = await this.adjuntoService.getById(id);
        return { data };
    }

    
    @Get(':tipo/:coleccionId')
    @ApiOperation({
        description: 'Devuelve todos los adjuntos por tipo noticia/evento dado el id de la coleccion',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha devuelto la información correctamente',
    })
    @ApiParam({
        name: 'tipo',
        type: String,
        required: true,
        description: 'campo para saber si es de tipo noticia o evento',
    })
    @ApiParam({
        name: 'coleccionId',
        type: Number,
        required: true,
        description: 'Id de la coleccion',
    })
    getAdjuntosPorColeccion(
        @Param('tipo') tipo: string,
        @Param('coleccionId') coleccionId: number,
    ) {
        return this.adjuntoService.adjuntosPorColeccion(tipo, coleccionId);
    }

    @Post()
    @ApiOperation({
        description: 'Crea un nuevo adjunto',
    })
    @ApiResponse({
        status: 200,
        description: 'Adjunto creado correctamente',
    })
    @ApiBody({
        description: 'crea un nuevo adjunto usando una AdjuntoDto',
        type: CreateAdjuntoDto,
        examples: {
          ejemplo1: {
            value: {
              nombre: "adjunto",
              url: "https:nombrefacultad",
              noticia_id: 1,
            },
          },
          ejemplo2: {
            value: {
                nombre: "",
                url: "https:nombrefacultad",
                evento_id: 1,
            },
          },
        },
    })
    async createAdjunto(@Body() dto:CreateAdjuntoDto){
        const data = await this.adjuntoService.createAdjunto({...dto});
        return { message: 'Adjunto creado', data};
    }

    @ApiOperation({
        description: 'Actualiza y publica un adjunto',
    })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id del adjunto',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha actualizado correctamente',
    })
    @ApiBody({
        description: 'Actualiza un adjunto usando una AdjuntoDto',
        type: EditAdjuntoDto,
        examples: {
          ejemplo1: {
            value: {
              nombre: "",
              url: "https:nombrefacultad",
              noticia_id: 1,
            },
          },
          ejemplo2: {
            value: {
                nombre: "",
                url: "https:nombrefacultad",
                noticia_id: 1,
            },
          },
        },
    })
    @Put(':id')
    async editAdjunto(@Param('id') id:number, @Body() dto: EditAdjuntoDto){
        let data;
        data = await this.adjuntoService.editAdjunto(id, dto);
        return { message: 'Adjunto editado', data };
    }

    @Delete(':id')
    @ApiOperation({
        description: 'Borra un adjunto dado un id',
      })
    @ApiParam({
        name: 'id',
        type: Number,
        required: true,
        description: 'Id del adjunto',
    })
    @ApiResponse({
        status: 200,
        description: 'Se ha borrado un adjunto correctamente',
    })
    async deleteAdjunto(@Param('id') id: number){
        let data;
        data = await this.adjuntoService.deleteAdjunto(id);
        return { message: 'Adjunto eliminado', data };
    }
}
