import { IsOptional } from 'class-validator';

export class CreateCarreraDocenteDto {
  @IsOptional()
  carreraId: number;

  @IsOptional()
  docenteId: number;

  @IsOptional()
  director: boolean;

  @IsOptional()
  coordinador: boolean;
}
