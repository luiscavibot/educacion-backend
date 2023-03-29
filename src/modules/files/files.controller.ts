import { Controller, Body, Post, Res, HttpStatus, Get, Param, ParseIntPipe, UseInterceptors, Query, DefaultValuePipe } from '@nestjs/common';
import { CreateFileDto } from './dtos';
import { FilesService } from './files.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common/decorators';
import { Observable } from 'rxjs';
import { File } from './entity/file.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('files')
export class FilesController {
    constructor(private readonly fileService: FilesService){}

    @Get('id/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.fileService.getById(id);
        return { data };
    }

    // @Post()
    // async createFile(
    //     @Body() dto: CreateFileDto,
    //     @Res() response,
    //   ) {
    //     try {
    //       const data = await this.fileService.createFile(dto, '');
    //       response.status(HttpStatus.CREATED).json({
    //         status: HttpStatus.CREATED,
    //         message: 'Creación exitosa',
    //         data,
    //       });
    //     } catch (error) {
    //       response.status(HttpStatus.FORBIDDEN).json({
    //         status: HttpStatus.FORBIDDEN,
    //         message: 'Hubo un error al crear registro',
    //         error: error.message,
    //       });
    //     }
    // }

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    async createMultipleFile(
      @Body() body: { namesFiles: string[], usuario_id:number },
      @UploadedFiles() files: Express.Multer.File[],
      @Res() response
    ){

      try {  
        const { namesFiles, usuario_id } = body;
        console.log(namesFiles);
        console.log(usuario_id);
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

    //Paginacion files

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
