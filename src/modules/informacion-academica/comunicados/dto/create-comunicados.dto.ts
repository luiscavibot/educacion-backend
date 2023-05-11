import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateComunicadosDto {

    @IsOptional()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    resumen: string;

    @IsOptional()
    dirigido: string[];

    @IsOptional()
    @IsBoolean()
    fijar: boolean;

    @IsOptional()
    @IsBoolean()
    estado: boolean;
    
    @IsOptional()
    @IsDate()
    fecha: Date;

    @IsOptional()
    @IsString()
    cuerpoComunicado: string;

    @IsOptional()
    @IsString()
    pie_foto: string;
    
    @IsOptional()
    @IsString()
    foto: string;

    @IsOptional()
    @IsNumber()
    last_updated_by: number;
}
