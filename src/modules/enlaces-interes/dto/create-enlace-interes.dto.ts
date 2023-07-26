import { ApiProperty } from "@nestjs/swagger";
import { IsOptional} from "class-validator";

export class CreateEnlaceIntereslDto {
    
    @ApiProperty({
        description: 'Etiqueta de enlace de interes',
    })
    @IsOptional()
    label: string;  
    
    @ApiProperty({
        description: 'Url del enlace de interes',
    })
    @IsOptional()
    link: string;

    @ApiProperty({
        description: 'Id del usuario creador del registro de enlace de interes',
    })
    @IsOptional()
    usuario_id: number;

    @ApiProperty({
        description: 'Id de la carrera a la cual pertenece del registro de enlace de interes',
    })
    @IsOptional()
    carrera_id: number;
    
    @ApiProperty({
        description: 'Id del ultimo usuario que editó el registro de enlace de interes',
    })
    @IsOptional()
    last_updated_by: number;
}
