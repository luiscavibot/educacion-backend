import { CreateAsignaturaDto } from './create-asignatura.dto';
import { PartialType } from '@nestjs/swagger';
export class EditAsignaturaDto extends PartialType(CreateAsignaturaDto) {}
