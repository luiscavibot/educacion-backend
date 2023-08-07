import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProgramaEspecialDto {

    @ApiProperty({
        description: 'Nombre del programa especial',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Tipo recurso del programa especial'
    })
    @Optional()
    tipoRecurso: string;

    @ApiProperty({
        description: 'Tipo de programa especial'
    })
    @Optional()  
    tipoProgramaEspecial: string;

    @ApiProperty({
        description: 'Url en S3 del programa especial'
    })
    @Optional()   
    url: string;

    @ApiProperty({
        description: 'Año del programa especial'
    })
    @Optional()   
    anio: number;

    @ApiProperty({
        description: 'Publicas o despublicar el programa especial'
    })
    @Optional()
    publicado: boolean;

    @ApiProperty({
        description: 'Fijar en la pagina web el programa especial'
    })
    @Optional()
    fijado: boolean;

    @ApiProperty({
        description: 'Id del usuario creador del programa especial'
    })
    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

}
