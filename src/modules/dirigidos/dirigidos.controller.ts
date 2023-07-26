import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DirigidosService } from './dirigidos.service';
import { CreateDirigidoDto, EditDirigidoDto } from './dto';


@Controller('dirigidos')
@ApiTags('Dirigidos')
export class DirigidosController {
    constructor(private readonly dirigidoService: DirigidosService) {}

  @Post()
  @ApiOperation({
    description: 'Crea un nuevo registro de dirigido'
  })
  @ApiResponse({
    status: 201,
    description: 'Registro creado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Error en los datos enviados' })
  @ApiResponse({ status: 500, description: 'Error del servidor' })
  async createDirigido(@Body() dto: CreateDirigidoDto) {
    const data = await this.dirigidoService.createDirigido({ ...dto });
    return { message: 'Dirigido creado', data };
  }

  @Put(':id')
  @ApiOperation({
    description: 'Actualiza un registro de dirigido dado su ID'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'ID de dirigido'
  })
  async editDirigido(@Param('id') id: number, @Body() dto: EditDirigidoDto) {
    let data;
    data = await this.dirigidoService.editDirigido(id, dto);
    return { message: 'Dirigido editado', data };
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Borra un registro de dirigido dado un id'
  })
  @ApiParam({
    name: 'id',
    type: Number,
    required: true,
    description: 'Id del registro de dirigido'
  })
  @ApiResponse({
    status: 200,
    description: 'Se ha borrado el registro de dirigido correctamente'
  })
  async deleteDirigido(@Param('id') id: number) {
    let data;
    data = await this.dirigidoService.deleteDirigido(id);
    return { message: 'Dirigido eliminado', data };
  }

}
