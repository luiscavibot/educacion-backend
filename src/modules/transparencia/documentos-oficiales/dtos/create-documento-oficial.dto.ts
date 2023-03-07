import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentoOficialDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  palabras_claves: string;

  @IsOptional()
  anio: string;

  @IsOptional()
  archivo: string;

  @IsOptional()
  fileName: string;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  usuario_id: number;

  @IsOptional()
  last_updated_by: number;

}