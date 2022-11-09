import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEnlaceIntereslDto {
    
    @IsOptional()
    label: string;  
    
    @IsOptional()
    link: string;

    @IsOptional()
    usuario_id: number;

    @IsOptional()
    carrera_id: number;
    
    @IsOptional()
    last_updated_by: number;
}
