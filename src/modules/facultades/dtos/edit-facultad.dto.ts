import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreateFacultadDto } from './create-facultad.dto';
import { IsOptional } from 'class-validator';

export class EditFacultadDto extends OmitType(CreateFacultadDto, [
    'nombre',
    'areaId'
] as const) {

  @ApiProperty({
    description: 'nombre de la facultad',
    required: false
  })
  @IsOptional()
  nombre: string;


}