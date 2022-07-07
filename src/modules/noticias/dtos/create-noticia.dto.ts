import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateNoticiaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsString()
  subtitulo: string;

  @IsArray()
  tags: string[];

  @IsString()
  cuerpo: string;
}
