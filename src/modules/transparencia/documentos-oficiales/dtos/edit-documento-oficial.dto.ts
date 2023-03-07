import { CreateDocumentoOficialDto } from './create-documento-oficial.dto';
import { OmitType } from '@nestjs/swagger';
export class EditDocumentoOficialDto extends OmitType(
  CreateDocumentoOficialDto,
  ['usuario_id'] as const,
) {}
