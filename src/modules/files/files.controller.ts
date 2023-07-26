import { Controller, Body, Post, Res, HttpStatus, Get, Param, ParseIntPipe, UseInterceptors, Query, DefaultValuePipe } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';
import { File } from './entity/file.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateFileDto } from './dtos';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService){}

    @Get('id/:id')
    @ApiOperation({
      description: 'Devuelve un archivo/imagen dado un id',
    })
    @ApiResponse({
      status: 200,
      description: 'Se ha devuelto la información correctamente',
    })
    @ApiParam({
      name: 'id',
      type: Number,
      required: true,
      description: 'Id de archivo/imagen',
    })
    @Get('id/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.fileService.getById(id);
        return { data };
    }

    @Post()
    @ApiOperation({
      description: 'Crea un nuevo archivo'
    })
    @ApiResponse({
      status: 201,
      description: 'Archivo creado correctamente',
    })
    @ApiBody({
      description: 'Crea un nuevo archivo usando un fileDto',
      type: CreateFileDto,
      examples: {
        ejemplo1:{
          value:{
            nombre: 'ejercicio',
            width: 511,
            height: 485,
            originalname: 'ejercicio_3 - copia.png',
            mimetype: 'image/png',
            s3url: 'https://unmsm-web-static-files.s3.sa-east-1.amazonaws.com/ejercicio_3%20-%20copia.png-1685631226028',
            usuario_id: 1,
          }
        },
      }
    })
    @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
    @ApiResponse({ status: 500, description: 'Error del servidor' })
    @UseInterceptors(FilesInterceptor('files'))
    async createMultipleFile(
      @Body() body: { namesFiles: string[], usuario_id:number },
      @UploadedFiles() files: Express.Multer.File[],
      @Res() response
    ){

      try {  
        const { namesFiles, usuario_id } = body;
        const data = await this.fileService.createMultipleFiles(files, namesFiles, usuario_id);
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

    @ApiOperation({
      description: 'Obtiene todos los files'
    })
    @Get('')
    getAllFiles(
      @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 0,
      @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number = 3,
      @Query('slug') slug: string,
      @Query('busqueda') busqueda: string,
      @Query('sort') sort: string,
    ): Observable<Pagination<File>>{
      limit = limit > 100 ? 100 : limit;
    return this.fileService.paginacionFiles(
      {
        limit,
        page,
      },
      slug,
      busqueda,
      sort,
    );

    }
}
