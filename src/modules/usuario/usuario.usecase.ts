import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './usuario.entity';

export class UsuarioUseCase {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) {}

  async getAll() {
    return await this.usuarioModel.findAll({
      // order: [['nombre', 'ASC']],
    });
  }

  async getById(idUsuario: string) {
    return await this.usuarioModel.findOne({
      where: {
        id: Number(idUsuario),
      },
    });
  }
}
