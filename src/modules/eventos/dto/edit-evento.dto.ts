import { OmitType } from '@nestjs/swagger';
import { CreateEventoDto } from './create-evento.dto';
export class EditEventoDto extends OmitType(CreateEventoDto, [
  'facultadId',
  'usuario_id',
] as const) {}
