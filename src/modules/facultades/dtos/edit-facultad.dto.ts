import { PartialType } from '@nestjs/swagger';
import { CreateFacultadDto } from './create-facultad.dto';

export class EditFacultadDto extends PartialType(CreateFacultadDto) {}
