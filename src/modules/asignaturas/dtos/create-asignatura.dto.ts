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
  tipo: boolean;

  @IsOptional()
  carreraId: number;
}
