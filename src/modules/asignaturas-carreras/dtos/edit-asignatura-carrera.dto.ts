import { PartialType } from '@nestjs/swagger';
import { CreateAsignaturaCarreraDto } from './create-asignatura-carrera.dto';
export class EditAsignaturaCarreraDto extends PartialType(
  CreateAsignaturaCarreraDto,
) {}
