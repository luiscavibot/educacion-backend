import { IsOptional, IsString } from 'class-validator';
import { CreateCarreraDto } from '../../carreras/dtos/create-carrera.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
export class EditCarreraDto extends OmitType(CreateCarreraDto, [
    'facultadId'
] as const ) {

    @ApiProperty({
        description: 'Nombre de la carrera',
    })
    @IsOptional()
    @IsString()
    nombre: string;
}
