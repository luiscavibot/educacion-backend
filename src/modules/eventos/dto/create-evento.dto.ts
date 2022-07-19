import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  cuerpo: string;

  @IsOptional()
  @IsString()
  tipo_evento: string;

  @IsOptional()
  @IsString()
  lugar: string;

  @IsOptional()
  @IsString()
  foto: string;
}
