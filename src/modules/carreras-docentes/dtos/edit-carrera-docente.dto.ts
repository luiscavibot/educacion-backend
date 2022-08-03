import { CreateCarreraDocenteDto } from './create-carrera-docente.dto';
import { PartialType } from '@nestjs/swagger';
export class EditCarreraDocenteDto extends PartialType(
  CreateCarreraDocenteDto,
) {}
