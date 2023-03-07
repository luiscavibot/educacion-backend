import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DirigidosService } from './dirigidos.service';
import { CreateDirigidoDto, EditDirigidoDto } from './dto';


@Controller('dirigidos')
@ApiTags('Dirigidos')
export class DirigidosController {
    constructor(private readonly dirigidoService: DirigidosService) {}

  @Post()
  async createDirectorio(@Body() dto: CreateDirigidoDto) {
    const data = await this.dirigidoService.Createdirigido({ ...dto });
    return { message: 'Dirigido creado', data };
  }

  @Put(':id')
  async editDocente(@Param('id') id: number, @Body() dto: EditDirigidoDto) {
    let data;
    data = await this.dirigidoService.editDirigido(id, dto);
    return { message: 'Dirigido editado', data };
  }

  @Delete(':id')
  async deleteDocente(@Param('id') id: number) {
    let data;
    data = await this.dirigidoService.deleteDirigido(id);
    return { message: 'Dirigido eliminado', data };
  }

}
