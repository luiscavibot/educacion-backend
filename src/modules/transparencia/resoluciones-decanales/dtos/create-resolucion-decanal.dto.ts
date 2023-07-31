import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResolucionDecanalDto {
  
  @ApiProperty({
    description: 'Nombre de la resolucion decanal'
  })
  @IsOptional()
  nombre: string;

  @ApiProperty({
    description: 'Descripcion de la resolucion decanal'
  })
  @IsOptional()
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Palabras claves para la busqueda de la resolucion decanal'
  })
  @IsOptional()
  @IsArray()
  palabras_claves: string[];

  @ApiProperty({
    description: 'Url en S3 de la resolucion decanal'
  })
  @IsOptional()
  @ApiProperty()
  documento: string;

  @ApiProperty({
    description: 'Nombre original del archivo de la resolucion decanal'
  })
  @IsOptional()
  fileName: string;

  @ApiProperty({
    description: 'Fecha de la resolucion decanal'
  })
  @IsOptional()
  fecha: Date;

  @ApiProperty({
    description: 'Campo para publicar o despublicar la resolucion decanal'
  })
  @IsOptional()
  estado: boolean;

  @ApiProperty({
    description: 'ID del usuario creador de la resolucion decanal'
  })
  @IsOptional()
  usuario_id: number;

  @ApiProperty({
    description: 'ID del ultimo usuario que modifico la resolucion decanal'
  })
  @IsOptional()
  last_updated_by: number;
}
