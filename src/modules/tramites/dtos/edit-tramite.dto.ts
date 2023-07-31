import { IsOptional } from 'class-validator';
import { CreateTramiteDto } from './create-tramite.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
export class EditTramiteDto extends OmitType(CreateTramiteDto, [
    'usuario_id'
] as const ) {

    @ApiProperty({
        description: 'ID del usuario creador del trámite'
      })
    @IsOptional()
    usuario_id: number;
}
