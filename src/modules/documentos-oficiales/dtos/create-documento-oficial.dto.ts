import { IsOptional } from 'class-validator';

export class CreateDocumentoOficialDto {
  @IsOptional()
  id: number;

  @IsOptional()
  nombre: string;

  @IsOptional()
  anio: string;

  @IsOptional()
  archivo: string;

  @IsOptional()
  fileName: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  usuario_id: number;

  @IsOptional()
  last_updated_by: number;
}
