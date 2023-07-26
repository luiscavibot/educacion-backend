import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class CreateFileDto {

    @ApiProperty({
        description: 'nombre del archivo'
    })
    @IsOptional()
    nombre: string;
    
    @ApiProperty({
        description: 'nombre original del archivo'
    })
    @IsOptional()
    originalname: string;
    
    @ApiProperty({
        description: 'Tipo del archivo'
    })
    @IsOptional()
    mimetype: string;
    
    @ApiProperty({
        description: 'Url del archivo en s3'
    })
    @IsOptional()
    s3url: string;
    
    @ApiProperty({
        description: 'Ancho del archivo en caso sea una imagen'
    })
    @IsOptional()
    width: number;
    
    @ApiProperty({
        description: 'Alto del archivo en caso sea una imagen'
    })
    @IsOptional()
    height: number;
}
