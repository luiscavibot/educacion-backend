import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentoOficialDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  @IsArray()
  palabras_claves: string[];;

  @IsOptional()
  anio: string;

  @IsOptional()
  archivo: string;

  @IsOptional()
  fileName: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  usuario_id: number;

  @IsOptional()
  last_updated_by: number;
}
