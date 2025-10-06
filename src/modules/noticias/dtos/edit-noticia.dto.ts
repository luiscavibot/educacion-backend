import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateNoticiaDto } from './create-noticia.dto';

export class EditNoticiaDto extends OmitType(CreateNoticiaDto, [
  'usuario_id',
  'last_updated_by',
] as const) {
  @IsOptional()
  last_updated_by?: number;
}
