import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActaConsejoDto {
  @IsOptional()
  fecha: Date;

  @IsOptional()
  sesion: string;

  @IsOptional()
  descripcion: string;

  @IsOptional()
  documento: string;

  @IsOptional()
  fileName: string;

  @IsOptional()
  video: string;

  @IsNotEmpty()
  facultadId: number;

  @IsOptional()
  usuario_id: number;

  @IsOptional()
  last_updated_by: number;

  @IsOptional()
  estado: boolean;
}
