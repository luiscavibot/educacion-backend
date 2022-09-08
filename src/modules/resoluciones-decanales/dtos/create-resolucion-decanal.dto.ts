import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResolucionDecanalDto {
  @IsOptional()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

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
