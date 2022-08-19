import { CreateResolucionDecanalDto } from './create-resolucion-decanal.dto';
import { PartialType } from '@nestjs/swagger';

export class EditResolucionDecanalDto extends PartialType(
  CreateResolucionDecanalDto,
) {}
