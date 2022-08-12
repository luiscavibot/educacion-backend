import { CreateDocumentoOficialDto } from './create-documento-oficial.dto';
import { PartialType } from '@nestjs/swagger';
export class EditDocumentoOficialDto extends PartialType(
  CreateDocumentoOficialDto,
) {}
