import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateProgramaEspecialDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsOptional()
    @IsString()
    tipoRecurso: string;

    @IsOptional()
    @IsString()    
    tipoProgramaEspecial: string;

    @IsOptional()
    @IsString()    
    url: string;

    @IsOptional()
    publicado: boolean;

    @IsOptional()
    fijado: boolean;

    @IsNotEmpty()
    @IsNumber()
    usuario_id: number;

}
