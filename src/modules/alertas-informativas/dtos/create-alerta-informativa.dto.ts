import { ApiProperty } from "@nestjs/swagger";

import { 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString 
} from "class-validator";

export class CreateAlertaInformativaDto { 
    
    @ApiProperty({
        description: 'Nombre de la Alerta informativa',
        required: true, // Campo requerido en Swagger para crear
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Descripción de la Alerta informativa',
    })
    @IsOptional()
    @IsString()
    descripcion: string;

    @ApiProperty({
        description: 'Url de la Alerta informativa en la seccion de admision',
    })
    @IsOptional()
    @IsString()    
    url: string;

    @ApiProperty({
        description: 'Estado de la Alerta informativa para saber si esta publicado o no',
    })
    @IsOptional()
    publicado: boolean;

    @ApiProperty({
        description: 'ID de usuario creador de la Alerta informativa',
    })
    @IsNotEmpty()
    @IsNumber()
    usuario_id: number;
}