import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResolucionDecanalDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsArray()
  palabras_claves: string[];

  @IsOptional()
  documento: string;

  @IsOptional()
  fileName: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  fecha: Date;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  usuario_id: number;

  @IsOptional()
  last_updated_by: number;
}
