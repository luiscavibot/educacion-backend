import { InjectModel } from '@nestjs/sequelize';
import { Docente } from './docente.entity';

export class DocenteUseCase {
  constructor(
    @InjectModel(Docente)
    private docenteModel: typeof Docente,
  ) {}

  async getAll() {
    return await this.docenteModel.findAll({
      // order: [['nombre', 'ASC']],
    });
  }

  async getById(idDocente: string) {
    return await this.docenteModel.findOne({
      where: {
        id: Number(idDocente),
      },
    });
  }
}
