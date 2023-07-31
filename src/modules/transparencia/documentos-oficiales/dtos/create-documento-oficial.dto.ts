import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentoOficialDto {

  @ApiProperty({
    description: 'Nombre del documento oficial',
    required: true
  })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Palabras claves para la busqueda de un documento ofiicial'
  })
  @IsOptional()
  @IsString()
  palabras_claves: string;

  @ApiProperty({
    description: 'Año del documento ofiicial'
  })
  @IsOptional()
  anio: string;

  @ApiProperty({
    description: 'Url del documento ofiicial en S3'
  })
  @IsOptional()
  archivo: string;

  @ApiProperty({
    description: 'Nombre del archivo del documento Oficial'
  })
  @IsOptional()
  fileName: string;

  @ApiProperty({
    description: 'Campo condicional para establecer si esta publicado o no'
  })
  @IsOptional()
  estado: boolean;

  @ApiProperty({
    description: 'ID del usuario creador del documento ofiicial'
  })
  @IsOptional()
  usuario_id: number;

  @ApiProperty({
    description: 'ID del ultimo usuario en actualizar el documento oficial'
  })
  @IsOptional()
  last_updated_by: number;

}