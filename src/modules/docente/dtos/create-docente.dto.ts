import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDocenteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  grado: string;

  @IsString()
  descripcion: string;
}
