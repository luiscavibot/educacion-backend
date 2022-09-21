import { IsOptional } from 'class-validator';

export class CreateAsignaturaCarreraDto {
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

  @IsOptional()
  asignaturaId: number;
}
