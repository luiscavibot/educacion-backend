import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMemoriaDto {

  @ApiProperty({
    description: 'Nombre de la memoria'
  })
  @IsOptional()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Palabras claves para la busqueda de la memoria'
  })
  @IsString()
  @IsArray()
  palabras_clave: string[];

  @ApiProperty({
    description: 'Url del s3 de la memoria'
  })
  @IsString()
  @IsOptional()
  documento: string;

  @ApiProperty({
    description: 'Nombre original de la memoria'
  })
  @IsOptional()
  fileName: string;

  @ApiProperty({
    description: 'Fecha de la memoria'
  })
  @IsDate()
  @IsOptional()
  fecha: Date;

  @ApiProperty({
    description: 'Campo para publicar o despublicar de la memoria'
  })
  @IsBoolean()
  @IsOptional()
  estado: boolean;

  @ApiProperty({
    description: 'ID del usuario creador de la memoria'
  })
  @IsNumber()
  @IsOptional()
  usuario_id: number;

  @ApiProperty({
    description: 'ID del ultimo usuario que modifico la memoria'
  })
  @IsNumber()
  @IsOptional()
  last_updated_by: number;
}
