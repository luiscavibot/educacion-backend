import { CreateMemoriaDto } from './create-memoria.dto';
import { PartialType } from '@nestjs/swagger';
export class EditMemoriaDto extends PartialType(CreateMemoriaDto) {}
