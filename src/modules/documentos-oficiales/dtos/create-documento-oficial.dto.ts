import { IsOptional } from 'class-validator';

export class CreateDocumentoOficialDto {
  @IsOptional()
  id: number;

  @IsOptional()
  nombre: string;

  @IsOptional()
  anio: number;

  @IsOptional()
  archivo: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  estado: boolean;
}
