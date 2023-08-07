import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class CreatePosgradoDto {

    @ApiProperty({
        description: 'Nombre de informacion académica de posgrado'
    })
    @IsOptional()
    nombre: string;
    
    @ApiProperty({
        description: 'Tipo de información académica de posgrado'
    })
    @IsOptional()
    tipo: string;
    
    @ApiProperty({
        description: 'Tipo del programa al que pertenece la información académicade posgrado'
    })
    @IsOptional()
    tipoPrograma: string;
    
    @ApiProperty({
        description: 'Programa al que pertenece la información académica de posgrado'
    })
    @IsOptional()
    nombrePrograma: string;
    
    @ApiProperty({
        description: 'Año de información académica de posgrado'
    })
    @IsOptional()
    anio: string;
    
    @ApiProperty({
        description: 'Url de la información académica de posgrado'
    })
    @IsOptional()
    url: string;
    
    @ApiProperty({
        description: 'Publicar o despublicar la información académica de posgrado'
    })
    @IsOptional()
    estado: boolean;
    
    @ApiProperty({
        description: 'Fijar en la web de la facultad la información académica de posgrado como uno de los primeros'
    })
    @IsOptional()
    fijado: boolean;
    
    @ApiProperty({
        description: 'Id del usuario que creó la información académica de posgrado',
        required: true
    })
    @IsOptional()
    usuarioId: number;
    
    @ApiProperty({
        description: 'Id del último usuario en actualizar la información académica de posgrado',
    })
    @IsOptional()
    last_updated_by: number;
}
