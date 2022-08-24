import { PartialType } from '@nestjs/swagger';
import { CreateGrupoInvestigacionDto } from './create-grupo-investigacion.dto';
export class EditGrupoInvestigacionDto extends PartialType(
  CreateGrupoInvestigacionDto,
) {}
