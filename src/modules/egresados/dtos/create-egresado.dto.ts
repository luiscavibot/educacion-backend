import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEgresadoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  grado: string;

  @IsOptional()
  @IsString()
  cargo: string;

  @IsOptional()
  @IsString()
  foto: string;

  @IsOptional()
  @IsString()
  frase: string;

  @IsOptional()
  @IsString()
  url_twitter: string;

  @IsOptional()
  @IsString()
  url_facebook: string;

  @IsOptional()
  @IsString()
  url_linkedin: string;
}
