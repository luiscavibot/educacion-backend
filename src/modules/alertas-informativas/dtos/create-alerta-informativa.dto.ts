import { 
    IsNotEmpty, 
    IsNumber, 
    IsOptional, 
    IsString 
} from "class-validator";

export class CreateAlertaInformativaDto {  
    @IsNotEmpty()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    descripcion: string;

    @IsOptional()
    @IsString()    
    url: string;

    @IsOptional()
    publicado: boolean;

    @IsNotEmpty()
    @IsNumber()
    usuario_id: number;
}