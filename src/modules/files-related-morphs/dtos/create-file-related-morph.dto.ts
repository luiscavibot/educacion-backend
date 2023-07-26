import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class CreateFileRelatedMorphDto {

  @ApiProperty({
    description: 'ID del archivo'
  })
  @IsOptional()
  file_id: number;
  
  @ApiProperty({
    description: 'ID de la coleccion(noticia o evento)'
  })
  @IsOptional()
  related_id: number;
  
  @ApiProperty({
    description: 'Tipo de coleccion(evento o noticia)'
  })
  @IsOptional()
  related_type: string;
  
  @ApiProperty({
    description: 'Posicion para mostrar la imagen en una noticia o evento'
  })
  @IsOptional()
  order: number;

}
