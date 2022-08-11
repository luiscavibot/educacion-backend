import { IsOptional, IsString } from 'class-validator';

export class CreateTramiteDto {
  @IsOptional()
  @IsString()
  titulo!: string;

  @IsOptional()
  dirigido: string[];

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  fecha: Date;

  @IsOptional()
  @IsString()
  requisitos: string;

  @IsOptional()
  @IsString()
  proceso: string;

  @IsOptional()
  @IsString()
  correo: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  estado: boolean;
}
