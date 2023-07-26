import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


enum NivelEstudio {
    Pregrado = 'pregrado',
    Posgrado = 'posgrado',
}


export class CreateAlertaAdmisionDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsString()
    ciclo: string;

    @IsNotEmpty()
    @IsIn([NivelEstudio.Pregrado, NivelEstudio.Posgrado])
    nivelDeEstudio: string;

    @IsOptional()
    @IsBoolean()
    publicado: boolean;

    @IsOptional()
    @IsDate() 
    fecha_inicio: Date;
    
    @IsOptional()
    @IsDate()
    fecha_fin: Date;

    @IsNotEmpty()
    @IsNumber()
    usuario_id: number;
}