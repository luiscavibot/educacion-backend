import { CreateActaConsejoDto } from './create-acta-consejo.dto';
import { OmitType } from '@nestjs/swagger';
export class EditActaConsejoDto extends OmitType(CreateActaConsejoDto, [
  'facultadId',
  'usuario_id',
] as const) {}
