import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ActasConsejoService } from './actas-consejo.service';
import { Observable } from 'rxjs';
import { ActaConsejo } from './entity/acta-consejo.entity';
import { CreateActaConsejoDto } from './dtos/create-acta-consejo.dto';
import { EditActaConsejoDto } from './dtos/edit-acta-consejo.dto';

@Controller('actas-consejo')
export class ActasConsejoController {
  constructor(private readonly actaConsejoService: ActasConsejoService) {}

  @Get(':slug')
  actasConsejoPorFacultad(
    @Param('slug') slug: string,
    @Query('year', ParseIntPipe) year?: number,
  ): Observable<ActaConsejo[]> {
    return this.actaConsejoService.actasConsejoPorFacultad(slug, year);
  }

  @Get('id/:id')
  async getByid(@Param('id') id: number) {
    const data = await this.actaConsejoService.getById(id);
    return { data };
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createActaConsejo(
    @Body() dto: CreateActaConsejoDto,
    @UploadedFile() file,
    @Res()
    response,
  ) {
    try {
      const data = await this.actaConsejoService.createActaConsejo(
        { ...dto },
        file,
      );
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

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async editActaConsejo(
    @Param('id') id: number,
    @Body() dto: EditActaConsejoDto,
    @UploadedFile() file,
  ) {
    if (file) {
      dto.documento = file.originalname;
    }
    let data;
    data = await this.actaConsejoService.editActaConsejo(id, dto, file);
    return { message: 'Acta consejo editada', data };
  }

  @Delete(':id')
  async deleteActaConsejo(@Param('id') id: number) {
    let data;
    data = await this.actaConsejoService.deleteActaConsejo(id);
    return { message: 'Acta consejo eliminada', data };
  }
}
