import { IsOptional } from 'class-validator';

export class CreateGrupoInvestigacionDto {
  @IsOptional()
  nombre: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  resolucion: string;

  @IsOptional()
  docenteId: number;

  @IsOptional()
  facultadId: number;
}
