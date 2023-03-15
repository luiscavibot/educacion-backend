import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlertaAdmisionPosgradoDto {
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsString()
    ciclo: string;

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