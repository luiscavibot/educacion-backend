import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { PerfilUseCase } from './perfil.usecase';

@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilUseCase: PerfilUseCase) {}

  @Get()
  async getPerfiles(@Res() response) {
    try {
      const data = await this.perfilUseCase.getAll();
      console.log(
        '🚀 ~ file: perfil.controller.ts ~ class: PerfilController ~ func: getPerfiles ~ var: data',
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

  async getPerfil(@Param('id') idPerfil: string, @Res() response) {
    try {
      const data = await this.perfilUseCase.getById(idPerfil);
      response.status(HttpStatus.OK).json({
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
