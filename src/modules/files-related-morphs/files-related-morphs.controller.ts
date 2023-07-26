import { Controller, Param, ParseIntPipe, Get, HttpStatus, Body, Res, Post } from '@nestjs/common';
import { FilesRelatedMorphsService } from './files-related-morphs.service';
import { CreateFileRelatedMorphDto } from './dtos/create-file-related-morph.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('files-related-morphs')
export class FilesRelatedMorphsController {

    constructor(private readonly fileRelatedMorphService: FilesRelatedMorphsService){}

    @Get('id/:id')
    @ApiOperation({
      description: 'Devuelve un archivo relacionado con una coleccion dado un id'
    })
    @ApiResponse({
      status: 200,
      description: 'Se ha devuelto la informacion correctamente'
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id del archivo relacionado con una coleccion'
    })
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.fileRelatedMorphService.getById(id);
        return { data };
    }



    @Post()
    @ApiOperation({
      description: 'Crea un nuevo archivo relacionado con una colección'
    })
    @ApiResponse({
      status: 201,
      description: 'Archivo relacionado con una coleccion creado correctamente',
    })
    @ApiBody({
      description: 'Crea un nuevo archivo usando un fileDto',
      type: CreateFileRelatedMorphDto,
      examples: {
        ejemplo1:{
          value:{
            file_id: 1,
            related_id: 1,
            related_type: 'noticia',
            order: 1
          }
        },
        ejemplo2:{
          value:{
            file_id: 2,
            related_id: 2,
            related_type: 'evento',
            order: 1
          }
        },
      }
    })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
    @ApiResponse({ status: 500, description: 'Error del servidor' })
    async createFileRelatedMorph(
        @Body() dto: CreateFileRelatedMorphDto,
        @Res() response,
      ) {
        try {
          const data = await this.fileRelatedMorphService.createFileRelatedMorph(dto);
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
    
}
