import { CreateDirectorioDto } from './create-directorio.dto';
import { PartialType } from '@nestjs/swagger';
export class EditDirectorioDto extends PartialType(CreateDirectorioDto) {}
