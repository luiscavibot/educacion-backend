import { OmitType } from '@nestjs/swagger';
import { CreateNoticiaDto } from './create-noticia.dto';
export class EditNoticiaDto extends OmitType(CreateNoticiaDto, [
  'usuario_id',
] as const) {}
