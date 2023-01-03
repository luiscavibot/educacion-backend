import { PartialType } from '@nestjs/swagger';
import { CreateProgramaDto } from './create-programa.dto';
export class EditProgramaDto extends PartialType(CreateProgramaDto){}
