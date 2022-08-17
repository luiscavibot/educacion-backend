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
  subtitulo: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  foto: string;

  @IsOptional()
  @IsString()
  pie_foto: string;

  @IsOptional()
  @IsString()
  cuerpo: string;

  @IsOptional()
  @IsDate()
  fecha: Date;

  @IsOptional()
  @IsBoolean()
  destacado: boolean;

  @IsOptional()
  estado: boolean;

  @IsOptional()
  resumen: string;

  @IsOptional()
  facultadId: number;

  @IsOptional()
  usuario_id: number;
}
