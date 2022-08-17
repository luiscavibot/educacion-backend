import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDocenteDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  foto: string;
}
