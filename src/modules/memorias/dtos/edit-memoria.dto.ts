import { CreateMemoriaDto } from './create-memoria.dto';
import { OmitType } from '@nestjs/swagger';
export class EditMemoriaDto extends OmitType(CreateMemoriaDto, [
  'facultadId',
  'usuario_id',
] as const) {}
