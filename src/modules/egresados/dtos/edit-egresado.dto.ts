import { PartialType } from '@nestjs/swagger';
import { CreateEgresadoDto } from './create-egresado.dto';
export class EditEgresadoDto extends PartialType(CreateEgresadoDto) {}
