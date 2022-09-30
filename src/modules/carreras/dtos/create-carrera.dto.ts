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
  bluredFoto: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsOptional()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  duracion: string;

  @IsOptional()
  @IsString()
  presentacion: string;

  @IsOptional()
  @IsString()
  link_web: string;

  @IsOptional()
  @IsString()
  correo: string;

  @IsOptional()
  @IsString()
  perfil_ingresante: string;

  @IsOptional()
  @IsString()
  perfil_graduado: string;

  @IsOptional()
  @IsString()
  campo_laboral: string;

  @IsOptional()
  @IsString()
  porQueEstudiarConNosotros: string;

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

  @IsOptional()
  facultadId: number;

  @IsOptional()
  en_proceso: boolean;

  @IsOptional()
  fecha_inicio: string;

  @IsOptional()
  cierre_inscripciones: string;
}
