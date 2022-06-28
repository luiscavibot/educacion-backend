import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Res,
  Param,
} from '@nestjs/common';
// import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { Docente } from '../docente/docente.entity';
import { DocenteUseCase } from '../docente/docente.usecase';
// import { AuthGuard } from '@nestjs/passport';

// @ApiBearerAuth()
@Controller('docentes')
export class DocenteController {
  constructor(private readonly docenteUseCase: DocenteUseCase) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async getdocentes(@Res() response) {
    try {
      const data = await this.docenteUseCase.getAll();
      console.log(
        '🚀 ~ file: docente.controller.ts ~ class: docenteController ~ func: getdocentees ~ var: data',
        data,
      );
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Respuesta exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al obtener registros',
      });
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: 'The found record',
  //   type: Docente,
  // })
  async getdocente(@Param('id') iddocente: string, @Res() response) {
    try {
      const data = await this.docenteUseCase.getById(iddocente);
      response.status(HttpStatus.CREATED).json({
        status: HttpStatus.OK,
        message: 'Respuesta exitosa',
        data,
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al obtener registro',
        error: error.message,
      });
    }
  }
}
