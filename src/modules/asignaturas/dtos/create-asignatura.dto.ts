import { IsOptional } from 'class-validator';

export class CreateAsignaturaDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  semestre: string;

  @IsOptional()
  anio: string;

  @IsOptional()
  credito: number;

  @IsOptional()
  electivo: boolean;

  @IsOptional()
  carreraId: number;

  @IsOptional()
  usuario_id: number;
}
