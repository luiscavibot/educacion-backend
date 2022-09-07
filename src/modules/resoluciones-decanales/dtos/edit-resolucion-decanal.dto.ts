import { CreateResolucionDecanalDto } from './create-resolucion-decanal.dto';
import { OmitType } from '@nestjs/swagger';

export class EditResolucionDecanalDto extends OmitType(
  CreateResolucionDecanalDto,
  ['facultadId', 'usuario_id'] as const,
) {}
