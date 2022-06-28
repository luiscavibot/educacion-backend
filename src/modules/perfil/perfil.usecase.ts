import { InjectModel } from '@nestjs/sequelize';
import { Perfil } from './perfil.entity';

export class PerfilUseCase {
  constructor(
    @InjectModel(Perfil)
    private perfilModel: typeof Perfil,
  ) {}

  async getAll() {
    return await this.perfilModel.findAll({
      order: [['nombre', 'ASC']],
    });
  }

  async getById(idPerfil: string) {
    return await this.perfilModel.findOne({
      where: {
        id: Number(idPerfil),
      },
    });
  }
}
