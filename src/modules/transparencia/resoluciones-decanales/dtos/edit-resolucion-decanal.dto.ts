import { CreateResolucionDecanalDto } from './create-resolucion-decanal.dto';
import { OmitType } from '@nestjs/swagger';

export class EditResolucionDecanalDto extends OmitType(
  CreateResolucionDecanalDto,
  ['usuario_id'] as const,
) {}
