import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class CreateActaConsejoDto {

  @ApiProperty({
    description: 'Fecha del acta de consejo'
  })
  @IsOptional()
  fecha: Date;

  @ApiProperty({
    description: 'Si es Ordinaria o Extraordinaria'
  })
  @IsOptional()
  sesion: string;

  @ApiProperty({
    description: 'Descripcion del acta de consejo'
  })
  @IsOptional()
  descripcion: string;

  @ApiProperty({
    description: 'Palabras claves para la busqueda del acta de consejo'
  })
  @IsOptional()
  @IsArray()
  palabras_claves: string[];

  @ApiProperty({
    description: 'Url del acta de consejo si es un archivo'
  })
  @IsOptional()
  documento: string;

  @ApiProperty({
    description: 'Nombre original del archivo del acta de consejo'
  })
  @IsOptional()
  fileName: string;

  @ApiProperty({
    description: 'Url del acta de consejo si en caso es un video'
  })
  @IsOptional()
  video: string;

  @ApiProperty({
    description: 'ID del usuario creador del acta de consejo'
  })
  @IsOptional()
  usuario_id: number;
  
  @ApiProperty({
    description: 'ID del ultimo usuario que modifico el acta de consejo'
  })
  @IsOptional()
  last_updated_by: number;

  @ApiProperty({
    description: 'Campo para publicar o despublicar el acta de consejo'
  })
  @IsOptional()
  estado: boolean;
  
}
