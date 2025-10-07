import { CreateActaConsejoDto } from './create-acta-consejo.dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditActaConsejoDto extends OmitType(CreateActaConsejoDto, [
  'usuario_id',
  'last_updated_by',
] as const) {
  @IsOptional()
  last_updated_by?: number;
}
