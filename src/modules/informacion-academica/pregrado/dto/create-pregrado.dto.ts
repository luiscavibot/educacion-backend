import { Optional } from "@nestjs/common";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePregradoDto {
    @Optional()
    @IsString()
    nombre: string;

    @Optional()
    tipo: string;

    @Optional()
    escuela: string;

    @Optional()
    anio: string;
    
    @Optional()
    url: string;

    @Optional()
    estado: boolean;

    @Optional()
    fijado: boolean;

    @Optional()
    facultadId: number;

    @Optional()
    usuarioId: number;

    @Optional()
    last_updated_by: number;
}
