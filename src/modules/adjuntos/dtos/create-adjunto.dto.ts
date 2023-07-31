import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";



export class CreateAdjuntoDto {

    @ApiProperty({
        description: 'Nombre del adjunto',
    })
    @IsOptional()
    nombre: string;

    @ApiProperty({
        description: 'Url del adjunto',
        required: true, 
        minLength: 1,
    })
    @IsOptional()
    url:string;
    
    @ApiProperty({
        description: 'Id de la noticia si en caso es un adjunto de noticia',
    })
    @IsOptional()
    @IsNumber()
    noticia_id: number;

    @ApiProperty({
        description: 'Id del evento si en caso es un adjunto de noticia',
    })
    @IsOptional()
    @IsNumber()
    evento_id: number;
}
