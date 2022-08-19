import { IsOptional } from 'class-validator';

export class CreateResolucionDecanalDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  documento: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  fecha: Date;

  @IsOptional()
  estado: boolean;
}
