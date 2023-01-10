import { PartialType } from '@nestjs/swagger';
import { CreateDirigidoDto } from './create-dirigido.dto';
export class EditDirigidoDto extends PartialType(CreateDirigidoDto){}
