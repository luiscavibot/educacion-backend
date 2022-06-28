import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UsuarioUseCase } from './usuario.usecase';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioUseCase: UsuarioUseCase) {}

  @Get()
  async getUsuarios(@Res() response) {
    try {
      const data = await this.usuarioUseCase.getAll();
      console.log(
        '🚀 ~ file: docente.controller.ts ~ class: docenteController ~ func: getdocentees ~ var: data',
        data,
      );
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Respuesta exitosa',
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al obtener registros',
      });
    }
  }

  async getUsuario(@Param('id') idusuario: string, @Res() response) {
    try {
      const data = await this.usuarioUseCase.getById(idusuario);
      response.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Respuesta exitosa',
      });
    } catch (error) {
      response.status(HttpStatus.FORBIDDEN).json({
        status: HttpStatus.FORBIDDEN,
        message: 'Hubo un error al obtener registros',
      });
    }
  }
}
