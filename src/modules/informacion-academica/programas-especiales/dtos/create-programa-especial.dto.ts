import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
export class CreateProgramaEspecialDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @Optional()
    tipoRecurso: string;

    @Optional()  
    tipoProgramaEspecial: string;

    @Optional()   
    url: string;

    @Optional()   
    anio: number;

    @Optional()
    publicado: boolean;

    @Optional()
    fijado: boolean;

    @IsNotEmpty()
    @IsNumber()
    usuarioId: number;

}
