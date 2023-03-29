import { Controller, Param, ParseIntPipe, Get, HttpStatus, Body, Res, Post } from '@nestjs/common';
import { FilesRelatedMorphsService } from './files-related-morphs.service';
import { CreateFileRelatedMorphDto } from './dtos/create-file-related-morph.dto';

@Controller('files-related-morphs')
export class FilesRelatedMorphsController {

    constructor(private readonly fileRelatedMorphService: FilesRelatedMorphsService){}

    @Get('id/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.fileRelatedMorphService.getById(id);
        return { data };
    }

    @Post()
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
