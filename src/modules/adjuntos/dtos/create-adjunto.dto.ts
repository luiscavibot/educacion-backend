import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";



export class CreateAdjuntoDto {

    @IsOptional()
    id: number;

    @IsOptional()
    nombre: string;

    @IsOptional()
    url:string;
    
    // @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    noticia_id: number;

    @IsOptional()
    @IsNumber()
    evento_id: number;
}
