import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNoticiaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  subtitulo: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  cuerpo: string;

  @IsOptional()
  @IsString()
  foto: string;

  @IsOptional()
  @IsDate()
  fecha: Date;

  @IsOptional()
  @IsBoolean()
  destacado: boolean;

  @IsOptional()
  facultadId: number;
}
