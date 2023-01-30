import { IsOptional, IsString } from 'class-validator';

export class CreateDirectorioDto {
  @IsOptional()
  @IsString()
  unidad: string;

  @IsOptional()
  @IsString()
  cargo: string;

  @IsOptional()
  @IsString()
  nombre: string;
  
  @IsOptional()
  anexo: string[];
  
  @IsOptional()
  correos: string[];

  @IsOptional()
  estado: boolean;

  @IsOptional()
  carreraId: number;

  @IsOptional()
  orden: number;
}
