import { CreateDocumentoOficialDto } from './create-documento-oficial.dto';
import { OmitType } from '@nestjs/swagger';
export class EditDocumentoOficialDto extends OmitType(
  CreateDocumentoOficialDto,
  ['facultadId', 'usuario_id'] as const,
) {}
