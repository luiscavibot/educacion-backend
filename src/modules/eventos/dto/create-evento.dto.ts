import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventoDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsString()
  slug: string;

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

  @IsOptional()
  estado: boolean;

  @IsOptional()
  @IsDate()
  fecha_inicio: Date;

  @IsOptional()
  @IsDate()
  fecha_final: Date;

  @IsNotEmpty()
  facultadId: number;

  @IsNotEmpty()
  usuario_id: number;
}
