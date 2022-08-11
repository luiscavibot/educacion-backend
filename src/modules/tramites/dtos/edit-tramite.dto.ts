import { CreateTramiteDto } from './create-tramite.dto';
import { PartialType } from '@nestjs/swagger';
export class EditTramiteDto extends PartialType(CreateTramiteDto) {}
