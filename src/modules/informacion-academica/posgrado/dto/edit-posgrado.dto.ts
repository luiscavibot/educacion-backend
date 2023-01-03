import { PartialType } from '@nestjs/swagger';
import { CreatePosgradoDto } from './create-posgrado.dto';
export class EditPosgradoDto extends PartialType(CreatePosgradoDto) {}
