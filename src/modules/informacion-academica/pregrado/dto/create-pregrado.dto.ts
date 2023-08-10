import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePregradoDto {

    @ApiProperty({
        description: 'Nombre de informacion académica de pregrado'
    })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'tipo de información académica de pregrado(HORARIOS, SYLLABUS, etc)'
    })
    @IsOptional()
    tipo: string;

    @ApiProperty({
        description: 'Escuela a la que pertenece la información académica'
    })
    @IsOptional()
    escuela: string;

    @ApiProperty({
        description: 'Año de información académica de pregrado'
    })
    @IsOptional()
    anio: string;
    
    @ApiProperty({
        description: 'Url de la información académica de pregrado'
    })
    @IsOptional()
    url: string;

    @ApiProperty({
        description: 'Publicar o despublicar la información académica de pregrado'
    })
    @IsOptional()
    estado: boolean;

    @ApiProperty({
        description: 'Fijar en la web de la facultad la información académica de pregrado como uno de los primeros'
    })
    @IsOptional()
    fijado: boolean;

    @ApiProperty({
        description: 'Id del usuario que creó la información académica de pregrado',
        required: true
    })
    @IsNotEmpty()
    usuarioId: number;

    @ApiProperty({
        description: 'Id del último usuario en actualizar la información académica de pregrado',
    })
    last_updated_by: number;
}
