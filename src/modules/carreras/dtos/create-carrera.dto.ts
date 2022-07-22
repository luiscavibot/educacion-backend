import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  foto: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  duracion: string;

  @IsOptional()
  @IsString()
  objetivos: string;

  @IsOptional()
  @IsString()
  perfil_ingresante: string;

  @IsOptional()
  @IsString()
  perfil_graduado: string;

  @IsOptional()
  @IsString()
  mision: string;

  @IsOptional()
  @IsString()
  vision: string;

  @IsOptional()
  @IsNumber()
  credito: number;

  @IsOptional()
  @IsNumber()
  vacante: number;

  @IsOptional()
  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  tipo_maestria: string;
}
