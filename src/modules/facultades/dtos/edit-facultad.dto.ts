import { OmitType } from '@nestjs/swagger';
import { CreateFacultadDto } from './create-facultad.dto';

export class EditFacultadDto extends OmitType(CreateFacultadDto, [
    'nombre',
    'areaId',
  ] as const) {}