import { IsOptional, IsString } from 'class-validator';
import { CreateAsignaturaDto } from './create-asignatura.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
export class EditAsignaturaDto extends OmitType(CreateAsignaturaDto,[
    'usuario_id',
    'carreraId',
    'nombre'
] as const ) {

    @ApiProperty({
        description: 'Nombre de la Asignatura',
        nullable: true,
        minLength: 1
      })
    @IsString()
    @IsOptional()
    nombre?: string;

}
