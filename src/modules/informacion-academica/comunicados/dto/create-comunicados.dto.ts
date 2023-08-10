import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateComunicadosDto {

    @ApiProperty({
        description: 'Nombre del comunicado'
    })
    @IsOptional()
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Resumen del comunicado'
    })
    @IsOptional()
    @IsString()
    resumen: string;

    @ApiProperty({
        description: 'A quienes esta dirigido el comunicado'
    })
    @IsOptional()
    dirigido: string[];

    @ApiProperty({
        description: 'Fijar el comunicado en la pagina web de la facultad que pertenece'
    })
    @IsOptional()
    @IsBoolean()
    fijar: boolean;

    @ApiProperty({
        description: 'si el comunicado esta publicado/no-publuciado'
    })
    @IsOptional()
    @IsBoolean()
    estado: boolean;
    
    @ApiProperty({
        description: 'Fecha del comunicado'
    })
    @IsOptional()
    @IsDate()
    fecha: Date;

    @ApiProperty({
        description: 'Contenido del comunicado'
    })
    @IsOptional()
    @IsString()
    cuerpoComunicado: string;

    @ApiProperty({
        description: 'Descripcion de la foto del comunicado'
    })
    @IsOptional()
    @IsString()
    pie_foto: string;
    
    @ApiProperty({
        description: 'Url en S3 del comunicado en aws'
    })
    @IsOptional()
    @IsString()
    foto: string;

    @ApiProperty({
        description: 'Id del usuario que actualizo por ultima vez al comunicado'
    })
    @IsOptional()
    @IsNumber()
    last_updated_by: number;
}
