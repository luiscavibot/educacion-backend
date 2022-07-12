import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarreraDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  duracion: string;

  @IsString()
  objetivos: string;

  @IsString()
  perfil_ingresante: string;

  @IsString()
  perfil_graduado: string;

  @IsString()
  mision: string;

  @IsString()
  vision: string;

  @IsNumber()
  credito: number;

  @IsNumber()
  vacante: number;

  @IsString()
  tipo: string;

  @IsString()
  tipo_maestria: string;
}
