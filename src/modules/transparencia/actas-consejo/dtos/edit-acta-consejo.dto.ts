import { CreateActaConsejoDto } from './create-acta-consejo.dto';
import { OmitType } from '@nestjs/swagger';
export class EditActaConsejoDto extends OmitType(CreateActaConsejoDto, [
  'usuario_id',
] as const) {}
